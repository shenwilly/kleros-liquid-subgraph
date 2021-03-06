// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class KlerosStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save KlerosStat entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save KlerosStat entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("KlerosStat", id.toString(), this);
  }

  static load(id: string): KlerosStat | null {
    return store.get("KlerosStat", id) as KlerosStat | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get courtCount(): BigInt {
    let value = this.get("courtCount");
    return value.toBigInt();
  }

  set courtCount(value: BigInt) {
    this.set("courtCount", Value.fromBigInt(value));
  }

  get disputeCount(): BigInt {
    let value = this.get("disputeCount");
    return value.toBigInt();
  }

  set disputeCount(value: BigInt) {
    this.set("disputeCount", Value.fromBigInt(value));
  }

  get activeDisputeCount(): BigInt {
    let value = this.get("activeDisputeCount");
    return value.toBigInt();
  }

  set activeDisputeCount(value: BigInt) {
    this.set("activeDisputeCount", Value.fromBigInt(value));
  }

  get uniqueJurorCount(): BigInt {
    let value = this.get("uniqueJurorCount");
    return value.toBigInt();
  }

  set uniqueJurorCount(value: BigInt) {
    this.set("uniqueJurorCount", Value.fromBigInt(value));
  }

  get uniqueArbitrableCount(): BigInt {
    let value = this.get("uniqueArbitrableCount");
    return value.toBigInt();
  }

  set uniqueArbitrableCount(value: BigInt) {
    this.set("uniqueArbitrableCount", Value.fromBigInt(value));
  }

  get phase(): string | null {
    let value = this.get("phase");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set phase(value: string | null) {
    if (value === null) {
      this.unset("phase");
    } else {
      this.set("phase", Value.fromString(value as string));
    }
  }
}

export class Court extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Court entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Court entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Court", id.toString(), this);
  }

  static load(id: string): Court | null {
    return store.get("Court", id) as Court | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get subcourtID(): BigInt {
    let value = this.get("subcourtID");
    return value.toBigInt();
  }

  set subcourtID(value: BigInt) {
    this.set("subcourtID", Value.fromBigInt(value));
  }

  get parent(): string | null {
    let value = this.get("parent");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set parent(value: string | null) {
    if (value === null) {
      this.unset("parent");
    } else {
      this.set("parent", Value.fromString(value as string));
    }
  }

  get hiddenVotes(): boolean {
    let value = this.get("hiddenVotes");
    return value.toBoolean();
  }

  set hiddenVotes(value: boolean) {
    this.set("hiddenVotes", Value.fromBoolean(value));
  }

  get minStake(): BigInt {
    let value = this.get("minStake");
    return value.toBigInt();
  }

  set minStake(value: BigInt) {
    this.set("minStake", Value.fromBigInt(value));
  }

  get alpha(): BigInt {
    let value = this.get("alpha");
    return value.toBigInt();
  }

  set alpha(value: BigInt) {
    this.set("alpha", Value.fromBigInt(value));
  }

  get feeForJuror(): BigInt {
    let value = this.get("feeForJuror");
    return value.toBigInt();
  }

  set feeForJuror(value: BigInt) {
    this.set("feeForJuror", Value.fromBigInt(value));
  }

  get jurorsForCourtJump(): BigInt {
    let value = this.get("jurorsForCourtJump");
    return value.toBigInt();
  }

  set jurorsForCourtJump(value: BigInt) {
    this.set("jurorsForCourtJump", Value.fromBigInt(value));
  }

  get timesPerPeriod(): Array<BigInt> {
    let value = this.get("timesPerPeriod");
    return value.toBigIntArray();
  }

  set timesPerPeriod(value: Array<BigInt>) {
    this.set("timesPerPeriod", Value.fromBigIntArray(value));
  }

  get children(): Array<string> {
    let value = this.get("children");
    return value.toStringArray();
  }

  set children(value: Array<string>) {
    this.set("children", Value.fromStringArray(value));
  }

  get disputeCount(): BigInt {
    let value = this.get("disputeCount");
    return value.toBigInt();
  }

  set disputeCount(value: BigInt) {
    this.set("disputeCount", Value.fromBigInt(value));
  }
}

export class Dispute extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Dispute entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Dispute entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Dispute", id.toString(), this);
  }

  static load(id: string): Dispute | null {
    return store.get("Dispute", id) as Dispute | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get disputeID(): BigInt {
    let value = this.get("disputeID");
    return value.toBigInt();
  }

  set disputeID(value: BigInt) {
    this.set("disputeID", Value.fromBigInt(value));
  }

  get arbitrable(): string {
    let value = this.get("arbitrable");
    return value.toString();
  }

  set arbitrable(value: string) {
    this.set("arbitrable", Value.fromString(value));
  }

  get subcourt(): string {
    let value = this.get("subcourt");
    return value.toString();
  }

  set subcourt(value: string) {
    this.set("subcourt", Value.fromString(value));
  }

  get numberOfChoices(): BigInt {
    let value = this.get("numberOfChoices");
    return value.toBigInt();
  }

  set numberOfChoices(value: BigInt) {
    this.set("numberOfChoices", Value.fromBigInt(value));
  }

  get period(): string {
    let value = this.get("period");
    return value.toString();
  }

  set period(value: string) {
    this.set("period", Value.fromString(value));
  }

  get lastPeriodChange(): BigInt {
    let value = this.get("lastPeriodChange");
    return value.toBigInt();
  }

  set lastPeriodChange(value: BigInt) {
    this.set("lastPeriodChange", Value.fromBigInt(value));
  }

  get drawsInRound(): BigInt {
    let value = this.get("drawsInRound");
    return value.toBigInt();
  }

  set drawsInRound(value: BigInt) {
    this.set("drawsInRound", Value.fromBigInt(value));
  }

  get commitsInRound(): BigInt {
    let value = this.get("commitsInRound");
    return value.toBigInt();
  }

  set commitsInRound(value: BigInt) {
    this.set("commitsInRound", Value.fromBigInt(value));
  }

  get ruled(): boolean {
    let value = this.get("ruled");
    return value.toBoolean();
  }

  set ruled(value: boolean) {
    this.set("ruled", Value.fromBoolean(value));
  }

  get latestRound(): BigInt {
    let value = this.get("latestRound");
    return value.toBigInt();
  }

  set latestRound(value: BigInt) {
    this.set("latestRound", Value.fromBigInt(value));
  }

  get rounds(): Array<string> {
    let value = this.get("rounds");
    return value.toStringArray();
  }

  set rounds(value: Array<string>) {
    this.set("rounds", Value.fromStringArray(value));
  }
}

export class Juror extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Juror entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Juror entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Juror", id.toString(), this);
  }

  static load(id: string): Juror | null {
    return store.get("Juror", id) as Juror | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get subCourts(): Array<string> {
    let value = this.get("subCourts");
    return value.toStringArray();
  }

  set subCourts(value: Array<string>) {
    this.set("subCourts", Value.fromStringArray(value));
  }

  get stakedToken(): BigInt {
    let value = this.get("stakedToken");
    return value.toBigInt();
  }

  set stakedToken(value: BigInt) {
    this.set("stakedToken", Value.fromBigInt(value));
  }

  get jurorStakes(): Array<string> {
    let value = this.get("jurorStakes");
    return value.toStringArray();
  }

  set jurorStakes(value: Array<string>) {
    this.set("jurorStakes", Value.fromStringArray(value));
  }
}

export class JurorStake extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save JurorStake entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save JurorStake entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("JurorStake", id.toString(), this);
  }

  static load(id: string): JurorStake | null {
    return store.get("JurorStake", id) as JurorStake | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get juror(): string {
    let value = this.get("juror");
    return value.toString();
  }

  set juror(value: string) {
    this.set("juror", Value.fromString(value));
  }

  get subcourt(): string {
    let value = this.get("subcourt");
    return value.toString();
  }

  set subcourt(value: string) {
    this.set("subcourt", Value.fromString(value));
  }

  get stakedToken(): BigInt {
    let value = this.get("stakedToken");
    return value.toBigInt();
  }

  set stakedToken(value: BigInt) {
    this.set("stakedToken", Value.fromBigInt(value));
  }
}

export class Policy extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Policy entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Policy entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Policy", id.toString(), this);
  }

  static load(id: string): Policy | null {
    return store.get("Policy", id) as Policy | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get subcourtID(): BigInt {
    let value = this.get("subcourtID");
    return value.toBigInt();
  }

  set subcourtID(value: BigInt) {
    this.set("subcourtID", Value.fromBigInt(value));
  }

  get policy(): string {
    let value = this.get("policy");
    return value.toString();
  }

  set policy(value: string) {
    this.set("policy", Value.fromString(value));
  }
}

export class Arbitrable extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Arbitrable entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Arbitrable entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Arbitrable", id.toString(), this);
  }

  static load(id: string): Arbitrable | null {
    return store.get("Arbitrable", id) as Arbitrable | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get disputeCount(): BigInt {
    let value = this.get("disputeCount");
    return value.toBigInt();
  }

  set disputeCount(value: BigInt) {
    this.set("disputeCount", Value.fromBigInt(value));
  }
}

export class DisputeRound extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DisputeRound entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DisputeRound entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DisputeRound", id.toString(), this);
  }

  static load(id: string): DisputeRound | null {
    return store.get("DisputeRound", id) as DisputeRound | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dispute(): string {
    let value = this.get("dispute");
    return value.toString();
  }

  set dispute(value: string) {
    this.set("dispute", Value.fromString(value));
  }

  get round(): BigInt {
    let value = this.get("round");
    return value.toBigInt();
  }

  set round(value: BigInt) {
    this.set("round", Value.fromBigInt(value));
  }

  get voteCount(): BigInt {
    let value = this.get("voteCount");
    return value.toBigInt();
  }

  set voteCount(value: BigInt) {
    this.set("voteCount", Value.fromBigInt(value));
  }

  get winningChoice(): BigInt | null {
    let value = this.get("winningChoice");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set winningChoice(value: BigInt | null) {
    if (value === null) {
      this.unset("winningChoice");
    } else {
      this.set("winningChoice", Value.fromBigInt(value as BigInt));
    }
  }

  get tied(): boolean {
    let value = this.get("tied");
    return value.toBoolean();
  }

  set tied(value: boolean) {
    this.set("tied", Value.fromBoolean(value));
  }

  get castedVoteCounts(): Array<BigInt> {
    let value = this.get("castedVoteCounts");
    return value.toBigIntArray();
  }

  set castedVoteCounts(value: Array<BigInt>) {
    this.set("castedVoteCounts", Value.fromBigIntArray(value));
  }

  get votes(): Array<string> {
    let value = this.get("votes");
    return value.toStringArray();
  }

  set votes(value: Array<string>) {
    this.set("votes", Value.fromStringArray(value));
  }
}

export class Vote extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Vote entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Vote entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Vote", id.toString(), this);
  }

  static load(id: string): Vote | null {
    return store.get("Vote", id) as Vote | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get disputeRound(): string {
    let value = this.get("disputeRound");
    return value.toString();
  }

  set disputeRound(value: string) {
    this.set("disputeRound", Value.fromString(value));
  }

  get juror(): string {
    let value = this.get("juror");
    return value.toString();
  }

  set juror(value: string) {
    this.set("juror", Value.fromString(value));
  }

  get voted(): boolean {
    let value = this.get("voted");
    return value.toBoolean();
  }

  set voted(value: boolean) {
    this.set("voted", Value.fromBoolean(value));
  }

  get commit(): Bytes | null {
    let value = this.get("commit");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set commit(value: Bytes | null) {
    if (value === null) {
      this.unset("commit");
    } else {
      this.set("commit", Value.fromBytes(value as Bytes));
    }
  }

  get choice(): BigInt | null {
    let value = this.get("choice");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set choice(value: BigInt | null) {
    if (value === null) {
      this.unset("choice");
    } else {
      this.set("choice", Value.fromBigInt(value as BigInt));
    }
  }
}
