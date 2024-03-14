import { makeAutoObservable } from 'mobx';
import { TALENTS, Talent, UNKNOWN_TALENT } from 'shared/src/data/talents';
import { ArrayMgt } from 'shared/src/utils/arrayMgt';
import { TalentMgt } from 'shared/src/utils/talentMgt';
import { Store } from './Store';

export class TalentsMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public talents: number[] = [];

   public talentsPoints: number = 0;

   public hoveredTalent: number | null = null;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public open(): void {
      this.isOpened = true;
   }

   public close(): void {
      this.isOpened = false;

      this.talents = [...this._store.characterStore.talents];
      this.talentsPoints = this._store.characterStore.talentsPoints;
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public addTalent(talent: number): void {
      this.talents = [...this.talents, talent];
   }

   public removeTalent(talent: number): void {
      this.talents = this.talents.filter((t) => t !== talent);
   }

   public setHoveredTalent(talent: number | null): void {
      this.hoveredTalent = talent;
   }

   public toggleNode(nodeId: number) {
      if (this.talentsMap[nodeId] && TalentMgt.canDisallocateTalent(nodeId, this.talents)) {
         this.removeTalent(nodeId);
         this.talentsPoints += 1;
      } else if (
         !this.talentsMap[nodeId] &&
         TalentMgt.canAllocateTalent(nodeId, this.talents, this.talentsPoints)
      ) {
         this.addTalent(nodeId);
         this.talentsPoints -= 1;
      }
   }

   public shouldBlink(nodeId: number): boolean {
      return this.adjacentTalentsMap[nodeId] && this.talentsPoints > 0;
   }

   public setTalents(talents: number[]) {
      this.talents = [...talents];
   }

   public setTalentsPoints(talentsPoints: number) {
      this.talentsPoints = talentsPoints;
   }

   public save() {
      this._store.colyseusStore.updateTalents(this.talents);

      this._store.characterStore.setTalents(this.talents);
      this._store.characterStore.setTalentsPoints(this.talentsPoints);

      this.close();
   }

   public get talentsMap(): Record<number, boolean> {
      return this.talents.reduce(
         (acc, talent) => {
            acc[talent] = true;
            return acc;
         },
         {} as Record<number, boolean>,
      );
   }

   public get hoveredTalentData(): Talent {
      if (this.hoveredTalent === null) {
         return UNKNOWN_TALENT;
      }

      const talent = TALENTS[this.hoveredTalent];

      if (talent === undefined) {
         return UNKNOWN_TALENT;
      }

      return talent;
   }

   public get tooltipOpened(): boolean {
      return this.hoveredTalent !== null;
   }

   public get adjacentTalentsMap(): Record<number, boolean> {
      const adjacentTalents = TalentMgt.getAdjacentTalentsExcludingAllocated(this.talents);
      return adjacentTalents.reduce(
         (acc, talent) => {
            acc[talent] = true;
            return acc;
         },
         {} as Record<number, boolean>,
      );
   }

   public get canApply(): boolean {
      return !ArrayMgt.areEquals(this._store.characterStore.talents, this.talents);
   }
}
