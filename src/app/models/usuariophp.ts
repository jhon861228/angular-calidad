export class Usuariophp {
    constructor(
        public nombres: string,
        public apellidos: string,
        public correo: string,
        public clave?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public id?: string
    ) {}
}
