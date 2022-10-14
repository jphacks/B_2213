import { memo, useState } from "react";
import styles from "../../../../styles/Home.module.css";

// eslint-disable-next-line react/display-name
const SetOption = memo(() => {
  return (
    <section className="h-screen bg-cover">
      <h1 className="text-2xl z-10 absolute top-5 left-5">back</h1>
      <div className="flex h-full w-full container mx-auto px-8 max-w-lg">
        <div className="relative">
          <h1 className="text-5xl pt-20 pb-10 w-full">Option</h1>

          <ul className="pl-2">
            <li className="pb-3 text-xl flex justify-between">
              <p>HHHHHHHHHH</p>
              <input
                data-testid="username"
                name="username"
                type="text"
                className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                autoComplete="off"
              />
            </li>
            <li className="pb-3  text-xl">
              <p>jjjjjjjjjj</p>
            </li>
            <li className="pb-3  text-xl">
              <p>AkitoHaseg</p>
            </li>
            <li className="pb-3  text-xl">
              <p>AkitoHaseg</p>
            </li>
            <li className="pb-3  text-xl">
              <p>AkitoHaseg</p>
            </li>
            <li className="pb-3  text-xl">
              <p>AkitoHaseg</p>
            </li>
            <li className="pb-3  text-xl">
              <p>AkitoHaseg</p>
            </li>
            <li className="pb-3  text-xl">
              <p>AkitoHaseg</p>
            </li>
            <li className="pb-3  text-xl">
              <p>AkitoHaseg</p>
            </li>
          </ul>

          <div className="pt-3 pl-2">
            <div className="py-4 flex justify-between border-b-2 border-[#95913f]">
              <h1 className="text-3xl w-full">BB</h1>
              <select
                name="BB"
                className="text-xl bg-poker-color focus:outline-none text-right"
              >
                <option value="man">HHHHHHHHHH</option>
                <option value="woman">AAAAAAAAAAA</option>
              </select>
            </div>
            <div className="py-4 flex justify-between border-b-2 border-[#95913f]">
              <h1 className="text-3xl w-full">SB</h1>
              <select
                name="SB"
                className="text-xl bg-poker-color focus:outline-none text-right"
              >
                <option value="man">HHHHHHHHHH</option>
                <option value="woman">AAAAAAAAAAA</option>
              </select>
            </div>
          </div>
          <div className="pt-3 pb-8 z-10 absolute bottom-0 right-0 bg-poker-color">
            <button className="px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md">
              Start
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SetOption;
