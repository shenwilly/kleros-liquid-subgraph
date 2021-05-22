import { Address, BigInt, store } from "@graphprotocol/graph-ts"
import { 
	KlerosLiquid, 
	KlerosLiquid__courtsResult, 
	KlerosLiquid__disputesResult, 
	KlerosLiquid__getSubcourtResult,
	KlerosLiquid__jurorsResult
} from "../generated/KlerosLiquid/KlerosLiquid"
import { Arbitrable, Court, Dispute, Juror, JurorStake, KlerosStat, Policy } from "../generated/schema"

export function getDisputeObj(disputeID: BigInt, courtAddress: Address): KlerosLiquid__disputesResult {
	let contract = KlerosLiquid.bind(courtAddress)
	return contract.disputes(disputeID)
}
  
export function getCourtObj(courtID: BigInt, courtAddress: Address): KlerosLiquid__courtsResult {
	let contract = KlerosLiquid.bind(courtAddress)
	return contract.courts(courtID)
}
  
export function getSubcourtObj(courtID: BigInt, courtAddress: Address): KlerosLiquid__getSubcourtResult {
	let contract = KlerosLiquid.bind(courtAddress)
	return contract.getSubcourt(courtID)
}
  
export function getJurorObj(jurorID: Address, courtAddress: Address): KlerosLiquid__jurorsResult {
	let contract = KlerosLiquid.bind(courtAddress)
	return contract.jurors(jurorID)
}
  
export function getOrCreateKlerosStat(): KlerosStat {
	let klerosStat = KlerosStat.load('ID')
	if (klerosStat == null) {
		klerosStat = new KlerosStat('ID')
		klerosStat.courtCount = BigInt.fromI32(1) //discount general court #0
		klerosStat.disputeCount = BigInt.fromI32(0)
		klerosStat.uniqueJurorCount = BigInt.fromI32(0)
		klerosStat.activeJurorCount = BigInt.fromI32(0) // TODO: impl
		klerosStat.uniqueArbitrableCount = BigInt.fromI32(0)
		klerosStat.save()
	}
	return klerosStat!
}
  
export function getOrCreateSubCourt(courtID: string, klerosAddress: Address): Court {
	let court = Court.load(courtID)
	if (court == null) {
		court = new Court(courtID)
		
		let courtObj = getCourtObj(BigInt.fromString(courtID), klerosAddress)
		let subCourtObj = getSubcourtObj(BigInt.fromString(courtID), klerosAddress)

		court.subcourtID = BigInt.fromString(courtID)

		let parentID = courtObj.value0
		if (parentID != BigInt.fromString(courtID)) {
		let parentCourt = getOrCreateSubCourt(parentID.toString(), klerosAddress)
		court.parent = parentCourt.id

		let parentCourtChildren = parentCourt.children
		parentCourtChildren.push(court.id)
		parentCourt.children = parentCourtChildren
		parentCourt.save()
	}
		court.hiddenVotes = courtObj.value1
		court.minStake = courtObj.value2
		court.alpha = courtObj.value3
		court.feeForJuror = courtObj.value4
		court.jurorsForCourtJump = courtObj.value5
		court.disputeCount = BigInt.fromI32(0)
		court.children = []
		court.timesPerPeriod = subCourtObj.value1
		court.save()
	}
	return court!
}
  
export function getOrCreateDispute(disputeID: string, klerosAddress: Address): Dispute {
	let dispute = Dispute.load(disputeID)
	if (dispute == null) {
		dispute = new Dispute(disputeID)

		dispute.disputeID = BigInt.fromString(disputeID)

		let disputeObj = getDisputeObj(BigInt.fromString(disputeID), klerosAddress);
		let subcourt = getOrCreateSubCourt(disputeObj.value0.toString(), klerosAddress)
		dispute.subcourt = subcourt.id
		dispute.arbitrable = disputeObj.value1
		dispute.numberOfChoices = disputeObj.value2
		dispute.period = i32ToPeriod(disputeObj.value3)
		dispute.lastPeriodChange = disputeObj.value4
		dispute.drawsInRound = disputeObj.value5;
		dispute.commitsInRound = disputeObj.value6;
		dispute.ruled = disputeObj.value7;

		let klerosStat = getOrCreateKlerosStat()
		klerosStat.disputeCount = klerosStat.disputeCount.plus(BigInt.fromI32(1))
		klerosStat.save()

		let courtID = dispute.subcourt
		let court = getOrCreateSubCourt(courtID, klerosAddress)
		court.disputeCount = court.disputeCount.plus(BigInt.fromI32(1))
		court.save()

		let arbitrableID = dispute.arbitrable.toHexString()
		let arbitrable = getOrCreateArbitrable(arbitrableID)
		arbitrable.disputeCount = court.disputeCount.plus(BigInt.fromI32(1))
		arbitrable.save()

		dispute.save()
	}
	return dispute!
}
  
export function getOrCreateJuror(jurorID: string): Juror {
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
  
export function getJurorStakeID(jurorID: string, courtID: string): string {
	return jurorID + '-' + courtID;
}
  
export function getOrCreateJurorStake(juror: Juror, court: Court): JurorStake {
	let jurorStakeID = getJurorStakeID(juror.id, court.id)
	let jurorStake = JurorStake.load(jurorStakeID)
	if (jurorStake == null) {
		jurorStake = new JurorStake(jurorStakeID)
		jurorStake.juror = juror.id
		jurorStake.subcourt = court.id
		jurorStake.stakedToken = BigInt.fromI32(0) //TODO: slash
		jurorStake.save()
	
		let jurorSubCourts = juror.subCourts
		jurorSubCourts.push(court.id)
		juror.subCourts = jurorSubCourts
		juror.save()
  	}
	return jurorStake!
}
  
export function removeJurorStake(juror: Juror, court: Court): void {
	let jurorStakeID = getJurorStakeID(juror.id, court.id)
	let jurorStake = JurorStake.load(jurorStakeID)
	if (jurorStake != null) {
		store.remove('JurorStake', jurorStake.id)
		
		let newSubCourts: string[] = []
		let jurorSubCourts = juror.subCourts
		for (let i = 0; i < jurorSubCourts.length; i++) {
		let jurorSubCourt = jurorSubCourts[i]
		if (jurorSubCourt != court.id) {
			newSubCourts.push(jurorSubCourt)
		}
	}
		juror.subCourts = newSubCourts
		juror.save()
  	}
}
  
export function updateJurorStat(juror: Juror): void {
	// TODO: totalLocked
	let totalStaked = BigInt.fromI32(0)
	let jurorSubCourts = juror.subCourts
	
	for (let i = 0; i < jurorSubCourts.length; i++) {
		let subCourtID = jurorSubCourts[i]
		let jurorStakeID = getJurorStakeID(juror.id, subCourtID)
		let jurorStake = JurorStake.load(jurorStakeID)
		totalStaked = totalStaked.plus(jurorStake.stakedToken)
  	}
	
	juror.stakedToken = totalStaked
	juror.save()
}
  
export function getOrCreateArbitrable(arbitrableID: string): Arbitrable {
	let arbitrable = Arbitrable.load(arbitrableID)
	if (arbitrable == null) {
		arbitrable = new Arbitrable(arbitrableID)
		arbitrable.disputeCount = BigInt.fromI32(0)
		arbitrable.save()

		let klerosStat = getOrCreateKlerosStat()
		klerosStat.uniqueArbitrableCount = klerosStat.uniqueArbitrableCount.plus(BigInt.fromI32(1))
		klerosStat.save()
  	}
	return arbitrable!
}
  
export function updateOrCreatePolicy(subcourtID: string, policy: string): Policy {
	let policyEntity = Policy.load(subcourtID)
	if (policyEntity == null) {
		policyEntity = new Policy(subcourtID)
		policyEntity.subcourtID = BigInt.fromString(subcourtID)
	} 
	policyEntity.policy = policy
	policyEntity.save()
	return policyEntity!
}
  
export function i32ToPeriod(periodNum: i32): string {
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
  
export function i32ToPhase(phaseNum: i32): string {
	let phase: string
	switch (phaseNum) {
	  case 0:
		phase = 'Staking'
		break;
	  case 1:
		phase = 'Generating'
		break;
	  case 2:
		phase = 'Drawing'
		break;
	  default:
		break;
  }
	return phase;
}
  