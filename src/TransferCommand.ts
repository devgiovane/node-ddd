import Command from "./Command";

export default class TransferCommand implements Command {
	operation = "transfer";

	constructor(
		public readonly documentFrom: string,
		public readonly documentTo: string,
		public readonly amount: number
	) {
	}

}
