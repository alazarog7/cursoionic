export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  img?: string[];
  _id?: string;
  coords?: string;
  mensaje?: string;
  usuario?: Usuario;
  created?: string
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}