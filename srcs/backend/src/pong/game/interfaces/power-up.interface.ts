import { IPosition } from './position.interface';

export interface IPowerUp {
  effect: string;
  color: string;
  position: IPosition;
  height: number;
  width: number;
}

// rouge: reduit la taille de la raquette enemi
// vert: monte la taille de sa raquette
// jaune: augmente la taille de la balle
// bleu: monte la vitesse de sa raquete
// orange: baisse la vitesse du joueur adverse
// truc ball qui clignote
