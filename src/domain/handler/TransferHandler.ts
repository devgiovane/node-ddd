import Observer from "../../infra/queue/Observer";
import AccountRepository from "../repository/AccountRepository";
import TransferCommand from "../../application/command/TransferCommand";
import TransferService from "../service/TransferService";

export default class TransferHandler implements Observer {
	operation = "transfer";

	constructor(
		private accountRepository: AccountRepository
	) {
	}

	public notify(command: TransferCommand): void {
		const accountFrom = this.accountRepository.get(command.documentFrom);
		const accountTo = this.accountRepository.get(command.documentTo);
		if (accountFrom && accountTo) {
			const transferService = new TransferService();
			transferService.transfer(accountFrom, accountTo, command.amount);
		}
	}

}
