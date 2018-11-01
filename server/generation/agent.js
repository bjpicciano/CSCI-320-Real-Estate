const RandomGenerator = require("./random_generator");

class Agent {
    constructor (id, first_name, last_name, salary, commissions, number_of_sales) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.salary = salary;
        this.commissions = commissions;
        this.number_of_sales = number_of_sales;
    }

    static CreateRandom() {
        const name = RandomGenerator.GetName();
        const salary = RandomGenerator.GetNumber(25000, 100000);
        const commission = RandomGenerator.GetNumber(0, 4);
        const number_of_sales = RandomGenerator.GetNumber(0, 100);

        return new Agent(null, name.first, name.last, salary, commission, number_of_sales);
    }
}

module.exports = Agent;