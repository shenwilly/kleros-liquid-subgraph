import {
    PolicyUpdate
} from "../../generated/PolicyRegistry/PolicyRegistry"
import { updateOrCreatePolicy } from "../helpers"

export function handlePolicyUpdate(event: PolicyUpdate): void {
    let subcourtID = event.params._subcourtID.toString()
    updateOrCreatePolicy(subcourtID, event.params._policy)
}