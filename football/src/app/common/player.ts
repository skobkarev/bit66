export class Player {
    constructor(
        public id: number = 0,        
        public firstName: string,
        public lastName: string,
        public gender: string,
        public birthDate: Date,
        public country: string,
        public team: string,
    ) { }

}