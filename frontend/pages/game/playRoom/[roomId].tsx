import { NextPage } from "next";
import { useState } from "react";
import ActionSelect from "../../../src/components/modules/select/game/ActionSelect";

const PlayRoom: NextPage = () => {
  const [showAction, setShowAction] = useState<Boolean>(false);
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex w-full items-center justify-center container mx-auto px-8">
          <div className="max-w-2xl text-center">
            <h1 onClick={() => setShowAction(true)}>aa</h1>
          </div>
        </div>

        <ActionSelect
          {...{ showAction: showAction, setShowAction: setShowAction }}
        />
      </section>
    </div>
  );
};

export default PlayRoom;
