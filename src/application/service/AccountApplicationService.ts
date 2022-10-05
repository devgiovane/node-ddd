import Account from "../../domain/entity/Account";
import AccountBuilder from "../../domain/builder/AccountBuilder";
import AccountRepository from "../../domain/repository/AccountRepository";
import Publisher from "../../infra/queue/Publisher";
import CreditCommand from "../command/CreditCommand";
import DebitCommand from "../command/DebitCommand";
import TransferCommand from "../command/TransferCommand";

export default class AccountApplicationService {

	constructor(
		private readonly publisher: Publisher,
		private readonly accountRepository: AccountRepository
	) {
	}

	public create(document: string): void {
		const account = new AccountBuilder(document).build();
		this.accountRepository.save(account);
	}

	public credit(document: string, amount: number): void {
		const creditCommand = new CreditCommand(document, amount);
		this.publisher.publish(creditCommand);
	}

	public debit(document: string, amount: number): void {
		const debitCommand = new DebitCommand(document, amount);
		this.publisher.publish(debitCommand);
	}

	public transfer(documentFrom: string, documentTo: string, amount: number): void {
		const transferCommand = new TransferCommand(documentFrom, documentTo, amount);
		this.publisher.publish(transferCommand);
	}

	public get(document: string): Account {
		return this.accountRepository.get(document);
	}
}
