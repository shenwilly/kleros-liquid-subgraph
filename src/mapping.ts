import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import {
  KlerosLiquid,
  NewPhase,
  NewPeriod,
  StakeSet,
  Draw,
  TokenAndETHShift,
  DisputeCreation,
  AppealPossible,
  AppealDecision,
  CreateSubcourtCall,
  KlerosLiquid__disputesResult,
  KlerosLiquid__courtsResult,
  KlerosLiquid__getSubcourtResult,
} from "../generated/KlerosLiquid/KlerosLiquid"
import { Court, Dispute, KlerosStat, Juror, JurorStake  } from "../generated/schema"

export function handleNewPhase(event: NewPhase): void {}

export function handleNewPeriod(event: NewPeriod): void {
  let disputeID = event.params._disputeID.toString()
  let dispute = Dispute.load(disputeID)

  let disputeObj = getDisputeObj(event.params._disputeID, event.address);
  dispute.period = i32ToPeriod(disputeObj.value3)
  dispute.lastPeriodChange = disputeObj.value4

  dispute.save()
}

export function handleStakeSet(event: StakeSet): void {
  let jurorID = event.params._address.toHexString()

  let juror = getOrCreateJuror(jurorID)
  let subcourt = getOrCreateSubCourt(event.params._subcourtID.toString(), event.address)

  let jurorStake = getOrCreateJurorStake(juror.id, subcourt.id)
  jurorStake.stakedToken = event.params._newTotalStake
  jurorStake.save()
}

export function handleDraw(event: Draw): void {}

export function handleTokenAndETHShift(event: TokenAndETHShift): void {}

export function handleDisputeCreation(event: DisputeCreation): void {
  let dispute = new Dispute(event.params._disputeID.toString())

  dispute.disputeID = event.params._disputeID
  dispute.arbitrable = event.params._arbitrable

  let disputeObj = getDisputeObj(event.params._disputeID, event.address);
  let subcourt = getOrCreateSubCourt(disputeObj.value0.toString(), event.address)
  dispute.subcourt = subcourt.id
  dispute.numberOfChoices = disputeObj.value2
  dispute.period = i32ToPeriod(disputeObj.value3)
  dispute.lastPeriodChange = disputeObj.value4
  dispute.drawsInRound = disputeObj.value5;
  dispute.commitsInRound = disputeObj.value6;
  dispute.ruled = disputeObj.value7;

  dispute.save()

  let klerosStat = getOrCreateKlerosStat()
  klerosStat.disputeCount = klerosStat.disputeCount.plus(BigInt.fromI32(1))
  klerosStat.save()

  let courtID = dispute.subcourt
  let court = getOrCreateSubCourt(courtID, event.address)
  court.disputeCount = court.disputeCount.plus(BigInt.fromI32(1))
  court.save()
}

export function handleAppealPossible(event: AppealPossible): void {}

export function handleAppealDecision(event: AppealDecision): void {
  let disputeID = event.params._disputeID.toString()
  let dispute = Dispute.load(disputeID)

  let disputeObj = getDisputeObj(event.params._disputeID, event.address);
  dispute.lastPeriodChange = disputeObj.value4
  dispute.drawsInRound = disputeObj.value5;
  dispute.commitsInRound = disputeObj.value6;

  dispute.save()
}

export function handleCreateSubcourt(call: CreateSubcourtCall): void {
  let klerosStat = getOrCreateKlerosStat()

  getOrCreateSubCourt(klerosStat.courtCount.toString(), call.to)

  klerosStat.courtCount = klerosStat.courtCount.plus(BigInt.fromI32(1))
  klerosStat.save();
}

function getDisputeObj(disputeID: BigInt, courtAddress: Address): KlerosLiquid__disputesResult {
  let contract = KlerosLiquid.bind(courtAddress)
  return contract.disputes(disputeID)
}

function getCourtObj(courtID: BigInt, courtAddress: Address): KlerosLiquid__courtsResult {
  let contract = KlerosLiquid.bind(courtAddress)
  return contract.courts(courtID)
}

function getSubcourt(courtID: BigInt, courtAddress: Address): KlerosLiquid__getSubcourtResult {
  let contract = KlerosLiquid.bind(courtAddress)
  return contract.getSubcourt(courtID)
}

// function getPeriod(period: BigInt): Period {
//   let periodObj: Period;
//   switch (period) {
//     case 0:
//       periodObj = Period.
//       break;
//   }
//   return periodObj
// }

function getOrCreateKlerosStat(): KlerosStat {
  let klerosStat = KlerosStat.load('ID')
  if (klerosStat == null) {
    klerosStat = new KlerosStat('ID')
    klerosStat.courtCount = BigInt.fromI32(1) //discount general court #0
    klerosStat.disputeCount = BigInt.fromI32(0)
    klerosStat.uniqueJurorCount = BigInt.fromI32(0)
    klerosStat.activeJurorCount = BigInt.fromI32(0)
    klerosStat.save()
  }
  return klerosStat!
}

function getOrCreateSubCourt(courtID: string, klerosAddress: Address): Court {
  let court = Court.load(courtID)
  if (court == null) {
    court = new Court(courtID)
    
    let courtObject = getCourtObj(BigInt.fromString(courtID), klerosAddress)
    let subCourtObj = getSubcourt(BigInt.fromString(courtID), klerosAddress)

    court.subcourtID = BigInt.fromString(courtID)

    let parentID = courtObject.value0
    if (parentID != BigInt.fromString(courtID)) {
      let parent = getOrCreateSubCourt(parentID.toString(), klerosAddress)
      court.parent = parent.id
    }
    court.hiddenVotes = courtObject.value1
    court.minStake = courtObject.value2
    court.alpha = courtObject.value3
    court.feeForJuror = courtObject.value4
    court.jurorsForCourtJump = courtObject.value5
    court.disputeCount = BigInt.fromI32(0)
    court.children = subCourtObj.value0
    court.timesPerPeriod = subCourtObj.value1
    court.save()
  }
  return court!
}

function getOrCreateJuror(jurorID: string): Juror {
  let juror = Juror.load(jurorID)
  if (juror == null) {
    juror = new Juror(jurorID)
    juror.subCourts = []
    juror.stakedToken = BigInt.fromI32(0)
    juror.lockedToken = BigInt.fromI32(0)
    juror.save()

    let klerosStat = getOrCreateKlerosStat()
    klerosStat.uniqueJurorCount = klerosStat.uniqueJurorCount.plus(BigInt.fromI32(1))
    klerosStat.save()
  }
  return juror!
}

function getOrCreateJurorStake(jurorID: string, courtID: string): JurorStake {
  const jurorStakeID = jurorID + '-' + courtID
  let jurorStake = JurorStake.load(jurorStakeID)
  if (jurorStake == null) {
    jurorStake = new JurorStake(jurorStakeID)
    jurorStake.juror = jurorID
    jurorStake.subcourt = courtID
    jurorStake.stakedToken = BigInt.fromI32(0)
    jurorStake.lockedToken = BigInt.fromI32(0)
    jurorStake.save()
  }
  return jurorStake!
function i32ToPeriod(periodNum: i32): string {
  let period: string
  switch (periodNum) {
    case 0:
      period = 'Evidence'
      break;
    case 1:
      period = 'Commit'
      break;
    case 2:
      period = 'Vote'
      break;
    case 3:
      period = 'Appeal'
      break;
    case 4:
      period = 'Execution'
      break;
    default:
      break;
  }
  return period;
}