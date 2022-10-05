import Command from "./Command";

export default class CreditCommand implements Command {
	operation = "credit";

	constructor(
		public readonly document: string,
		public readonly amount: number
	) {
	}

}
