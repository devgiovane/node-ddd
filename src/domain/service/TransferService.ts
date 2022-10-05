import Account from "../entity/Account";

export default class TransferService {

	constructor() {
	}

	public transfer(from: Account, to: Account, amount: number) {
		from.debit(amount);
		to.credit(amount);
	}
}
