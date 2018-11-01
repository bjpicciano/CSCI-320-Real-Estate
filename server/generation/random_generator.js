class RandomGenerator {
    static GetName() {
        const first_names = ["Rudolph","Alvin","Maximo","Magdalene","Henry","Ron","Keturah","Fernanda","Homer","Linn","Oleta","Casie","Jermaine","Judy","Ethan","Howard","Monet","Johnny","Paul","Donita"];
        const last_names = ["Sims","Graham","Olson","Grant","Meyers","Smith","Fuller","Arroyo","Jensen","Combs","Soto","Terry","Oneal","Yates","Poole","Brown","Romero","Neal","Mckay","Ingram"];

        const first_name_index = this.GetNumber(0, first_names.length, 0);
        const last_name_index = this.GetNumber(0, last_names.length, 0);

        return {
            "first": first_names[first_name_index],
            "last": last_names[last_name_index]
        };
    }

    static GetNumber(min, max, decimalPlaces = 2) {
        const rand = Math.random() * (max - min) + min;
        const power = Math.pow(10, decimalPlaces);
        return Math.floor(rand * power) / power;
    }
}

module.exports = RandomGenerator;