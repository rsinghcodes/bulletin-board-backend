interface DefaultPosition {
  x: number;
  y: number;
}

export interface NoteType {
  content: string;
  color: string;
  defaultPos: DefaultPosition;
}
