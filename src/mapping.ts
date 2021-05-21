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
import { Court, Dispute, KlerosStat  } from "../generated/schema"

export function handleNewPhase(event: NewPhase): void {}

export function handleNewPeriod(event: NewPeriod): void {
  let disputeId = event.params._disputeID.toString()
  let dispute = Dispute.load(disputeId)

  let disputeObj = getDisputeObj(event.params._disputeID, event.address);
  dispute.period = disputeObj.value3
  dispute.lastPeriodChange = disputeObj.value4

  dispute.save()
}

export function handleStakeSet(event: StakeSet): void {}

export function handleDraw(event: Draw): void {}

export function handleTokenAndETHShift(event: TokenAndETHShift): void {}

export function handleDisputeCreation(event: DisputeCreation): void {
  let dispute = new Dispute(event.params._disputeID.toString())

  dispute.disputeID = event.params._disputeID
  dispute.arbitrable = event.params._arbitrable

  let disputeObj = getDisputeObj(event.params._disputeID, event.address);
  dispute.subcourtID = disputeObj.value0
  dispute.numberOfChoices = disputeObj.value2
  dispute.period = disputeObj.value3
  dispute.lastPeriodChange = disputeObj.value4
  dispute.drawsInRound = disputeObj.value5;
  dispute.commitsInRound = disputeObj.value6;
  dispute.ruled = disputeObj.value7;

  dispute.save()

  let klerosStat = getOrCreateKlerosStat()
  klerosStat.disputeCount = klerosStat.disputeCount.plus(BigInt.fromI32(1))
  klerosStat.save()

  let courtId = dispute.subcourtID
  let court = getOrCreateSubCourt(courtId, event.address)
  court.disputeCount = court.disputeCount.plus(BigInt.fromI32(1))
  court.save()
}

export function handleAppealPossible(event: AppealPossible): void {}

export function handleAppealDecision(event: AppealDecision): void {
  let disputeId = event.params._disputeID.toString()
  let dispute = Dispute.load(disputeId)

  let disputeObj = getDisputeObj(event.params._disputeID, event.address);
  dispute.lastPeriodChange = disputeObj.value4
  dispute.drawsInRound = disputeObj.value5;
  dispute.commitsInRound = disputeObj.value6;

  dispute.save()
}

export function handleCreateSubcourt(call: CreateSubcourtCall): void {
  let klerosStat = getOrCreateKlerosStat()

  getOrCreateSubCourt(klerosStat.courtCount, call.to)

  klerosStat.courtCount = klerosStat.courtCount.plus(BigInt.fromI32(1))
  klerosStat.save();
}

function getDisputeObj(disputeId: BigInt, courtAddress: Address): KlerosLiquid__disputesResult {
  let contract = KlerosLiquid.bind(courtAddress)
  return contract.disputes(disputeId)
}

function getCourtObj(courtId: BigInt, courtAddress: Address): KlerosLiquid__courtsResult {
  let contract = KlerosLiquid.bind(courtAddress)
  return contract.courts(courtId)
}

function getSubcourt(courtId: BigInt, courtAddress: Address): KlerosLiquid__getSubcourtResult {
  let contract = KlerosLiquid.bind(courtAddress)
  return contract.getSubcourt(courtId)
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
    klerosStat.save()
  }
  return klerosStat!
}

function getOrCreateSubCourt(courtId: BigInt, klerosAddress: Address): Court {
  let court = Court.load(courtId.toString())
  if (court == null) {
    court = new Court(courtId.toString())

    let courtObject = getCourtObj(courtId, klerosAddress)
    let subCourtObj = getSubcourt(courtId, klerosAddress)

    court.subcourtID = courtId
    court.parentID = courtObject.value0
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