import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  NewPhase,
  NewPeriod,
  StakeSet,
  Draw,
  TokenAndETHShift,
  DisputeCreation,
  AppealPossible,
  AppealDecision,
  CreateSubcourtCall,
  ExecuteRulingCall,
  ChangeSubcourtAlphaCall,
  ChangeSubcourtJurorFeeCall,
  ChangeSubcourtJurorsForJumpCall,
  ChangeSubcourtTimesPerPeriodCall,
} from "../../generated/KlerosLiquid/KlerosLiquid"
import { 
  getDisputeObj,
  getOrCreateDispute,
  getOrCreateJuror,
  getOrCreateJurorStake,
  getOrCreateKlerosStat, 
  getOrCreateSubCourt, 
  i32ToPeriod, 
  i32ToPhase, 
  removeJurorStake, 
  updateJurorStat
} from "../helpers"

export function handleNewPhase(event: NewPhase): void {
  let phase = i32ToPhase(event.params._phase)
  let klerosStat = getOrCreateKlerosStat()
  klerosStat.phase = phase
  klerosStat.save()
}

export function handleNewPeriod(event: NewPeriod): void {
  let disputeID = event.params._disputeID.toString()
  let dispute = getOrCreateDispute(disputeID, event.address)

  let disputeObj = getDisputeObj(event.params._disputeID, event.address);
  dispute.period = i32ToPeriod(disputeObj.value3)
  dispute.lastPeriodChange = disputeObj.value4

  dispute.save()
}

export function handleStakeSet(event: StakeSet): void {
  let jurorID = event.params._address.toHexString()

  let juror = getOrCreateJuror(jurorID)
  let subcourt = getOrCreateSubCourt(event.params._subcourtID.toString(), event.address)

  let jurorStake = getOrCreateJurorStake(juror, subcourt)
  let newTotalStake = event.params._newTotalStake

  if (newTotalStake == BigInt.fromI32(0)) {
    removeJurorStake(juror, subcourt)
  } else {
    jurorStake.stakedToken = event.params._newTotalStake
    jurorStake.save()
  }

  updateJurorStat(juror)
}

export function handleDraw(event: Draw): void {}

export function handleTokenAndETHShift(event: TokenAndETHShift): void {}

export function handleDisputeCreation(event: DisputeCreation): void {
  getOrCreateDispute(event.params._disputeID.toString(), event.address)
}

export function handleAppealPossible(event: AppealPossible): void {}

export function handleAppealDecision(event: AppealDecision): void {
  let disputeID = event.params._disputeID.toString()
  let dispute = getOrCreateDispute(disputeID, event.address)

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

export function handleExecuteRuling(call: ExecuteRulingCall): void {
  let disputeID = call.inputs._disputeID.toString()
  let dispute = getOrCreateDispute(disputeID, call.to)

  if (dispute.period == 'Execution') {
    dispute.ruled = true
    dispute.save()

    // TODO: update juror locked token
    // let juror = getJurorObj()
  }
}

export function handleChangeSubcourtAlpha(call: ChangeSubcourtAlphaCall): void {
  let subcourtID = call.inputs._subcourtID.toString()
  let subcourt = getOrCreateSubCourt(subcourtID, call.to)
  subcourt.alpha = call.inputs._alpha
}

export function handleChangeSubcourtJurorFee(call: ChangeSubcourtJurorFeeCall): void {
  let subcourtID = call.inputs._subcourtID.toString()
  let subcourt = getOrCreateSubCourt(subcourtID, call.to)
  subcourt.feeForJuror = call.inputs._feeForJuror
}

export function handleChangeSubcourtJurorsForJump(call: ChangeSubcourtJurorsForJumpCall): void {
  let subcourtID = call.inputs._subcourtID.toString()
  let subcourt = getOrCreateSubCourt(subcourtID, call.to)
  subcourt.jurorsForCourtJump = call.inputs._jurorsForCourtJump
}

export function handleChangeSubcourtTimesPerPeriod(call: ChangeSubcourtTimesPerPeriodCall): void {
  let subcourtID = call.inputs._subcourtID.toString()
  let subcourt = getOrCreateSubCourt(subcourtID, call.to)
  subcourt.timesPerPeriod = call.inputs._timesPerPeriod
}