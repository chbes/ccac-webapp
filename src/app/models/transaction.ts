export class Transaction {

    public id: string;
    public date: Date;
    public amount: number;
    public user: string;

    constructor() {
        this.id = '';
        this.date = new Date();
        this.amount = null;
        this.user = 'User';
    }

    public static fromJson(json: Object) {
        const newTransaction = new Transaction();
        newTransaction.id = json['id'];
        newTransaction.date = json['date'];
        newTransaction.amount = json['amount'];
        newTransaction.user = json['user'];
        return newTransaction;
    }

}
