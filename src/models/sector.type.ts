export interface SectorType {
  name: string;
  amount: number;
  color: string;
}

export interface SectorDetailedType extends SectorType {
  id: number;
}
