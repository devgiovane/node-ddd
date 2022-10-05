import Observer from "./Observer";
import CreditCommand from "./CreditCommand";
import AccountRepository from "./AccountRepository";

export default class CreditHandler implements Observer {
	operation = "credit";

	constructor(
		private accountRepository: AccountRepository
	) {
	}

	public notify(command: CreditCommand): void {
		const account = this.accountRepository.get(command.document);
		if (account) {
			account.credit(command.amount);
		}
	}

}
