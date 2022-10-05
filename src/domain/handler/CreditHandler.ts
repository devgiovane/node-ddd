import Observer from "../../infra/queue/Observer";
import CreditCommand from "../../application/command/CreditCommand";
import AccountRepository from "../repository/AccountRepository";

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
