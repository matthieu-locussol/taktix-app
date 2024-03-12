import { makeAutoObservable, runInAction } from 'mobx';
import { TALENTS, Talent, UNKNOWN_TALENT } from 'shared/src/data/talents';
import { Store } from './Store';

export class TalentsMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public loading: boolean = false;

   public talents: string[] = [];

   public hoveredTalent: string | null = null;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;

      this.fetchTalents();
   }

   private async fetchTalents() {
      runInAction(() => {
         this.loading = true;
      });

      try {
         // const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/talents`);
         // const json = await response.json();
         // const { talents } = zTalentsSchema.parse(json);

         runInAction(() => {
            // this.talents = talents;
            this.loading = false;
         });
      } catch (error) {
         runInAction(() => {
            this.talents = [];
            this.loading = false;
         });
      }
   }

   public open(): void {
      this.isOpened = true;
   }

   public close(): void {
      this.isOpened = false;
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public addTalent(talent: string): void {
      this.talents = [...this.talents, talent];
   }

   public removeTalent(talent: string): void {
      this.talents = this.talents.filter((t) => t !== talent);
   }

   public setHoveredTalent(talent: string | null): void {
      this.hoveredTalent = talent;
   }

   public get talentsMap(): Record<string, boolean> {
      return this.talents.reduce(
         (acc, talent) => {
            acc[talent] = true;
            return acc;
         },
         {} as Record<string, boolean>,
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

   public toggleNode(nodeId: string) {
      if (this.talentsMap[nodeId]) {
         this.removeTalent(nodeId);
      } else {
         this.addTalent(nodeId);
      }
   }
}
