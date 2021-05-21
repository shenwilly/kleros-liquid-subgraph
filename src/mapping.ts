import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  NewPhase,
  NewPeriod,
  StakeSet,
  Draw,
  TokenAndETHShift,
  DisputeCreation,
  AppealPossible,
  AppealDecision
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleNewPhase(event: NewPhase): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._phase = event.params._phase

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.RNBlock(...)
  // - contract.disputesWithoutJurors(...)
  // - contract.governor(...)
  // - contract.lastDelayedSetStake(...)
  // - contract.disputeStatus(...)
  // - contract.maxDrawingTime(...)
  // - contract.currentRuling(...)
  // - contract.courts(...)
  // - contract.ALPHA_DIVISOR(...)
  // - contract.getSubcourt(...)
  // - contract.onTransfer(...)
  // - contract.disputes(...)
  // - contract.RN(...)
  // - contract.RNGenerator(...)
  // - contract.NON_PAYABLE_AMOUNT(...)
  // - contract.getVote(...)
  // - contract.stakeOf(...)
  // - contract.appealPeriod(...)
  // - contract.phase(...)
  // - contract.MAX_STAKE_PATHS(...)
  // - contract.delayedSetStakes(...)
  // - contract.lastPhaseChange(...)
  // - contract.minStakingTime(...)
  // - contract.nextDelayedSetStake(...)
  // - contract.getJuror(...)
  // - contract.onApprove(...)
  // - contract.jurors(...)
  // - contract.getDispute(...)
  // - contract.getVoteCounter(...)
  // - contract.MIN_JURORS(...)
  // - contract.appealCost(...)
  // - contract.lockInsolventTransfers(...)
  // - contract.arbitrationCost(...)
  // - contract.pinakion(...)
}

export function handleNewPeriod(event: NewPeriod): void {}

export function handleStakeSet(event: StakeSet): void {}

export function handleDraw(event: Draw): void {}

export function handleTokenAndETHShift(event: TokenAndETHShift): void {}

export function handleDisputeCreation(event: DisputeCreation): void {}

export function handleAppealPossible(event: AppealPossible): void {}

export function handleAppealDecision(event: AppealDecision): void {}
