import { CreateSafe } from './components/CreateSafe';
import { SendSafeTx } from './components/SendSafeTx';
import { AddOwner } from './components/AddOwner';

/** Component */
export const PageHome = () => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return (
    <div className="page-home w">
      <div className="grid gap-80">
        <CreateSafe />

        <AddOwner />

        <SendSafeTx />
      </div>
    </div>
  );
};
