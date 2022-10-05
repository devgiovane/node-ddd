import Command from "./Command";

export default class DebitCommand implements Command {
	operation = "debit";

	constructor(
		public readonly document: string,
		public readonly amount: number
	) {
	}

}
