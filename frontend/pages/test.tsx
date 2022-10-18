import { NextPage } from "next";
import ModalBBSB from "../src/components/Organisms/game/ModalBBSB";

const Test: NextPage = () => {
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="h-full w-full container mx-auto px-8 max-w-lg">
          <h1 className="text-4xl pt-8 pb-1 w-full">Stage : 1</h1>

          <div className="text-center mt-8 py-4 border-2 border-gold rounded-md">
            <h1 className="text-4xl w-full">POT</h1>
            <h1 className="text-3xl pt-2 w-full">100000</h1>
          </div>

          <div className="pt-8">
            <h1 className="text-3xl w-full">Bets of member</h1>
            <ul className="pl-2 pt-3">
              <li className="pb-3 text-xl flex justify-between">
                <p>HHHHHHHHHH</p>
                <p className="text-right">100000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
              <li className="pb-3 text-xl flex justify-between">
                <p>Hfsefegs</p>
                <p className="text-right">1000</p>
              </li>
            </ul>
          </div>

          <div className="text-center pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10 bg-poker-color">
            <button className="px-6 py-2 mx-3 border-gold-button transition-colors duration-300 transform rounded-md ">
              Action
            </button>

            <button className="px-6 py-2 mx-3 bg-gold-button transition-colors duration-300 transform rounded-md">
              Change Data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Test;
