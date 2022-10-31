import { createContext, memo, useContext, useEffect, useState } from "react";
import { MemberContext } from "../../../../pages/game/waitRoom/[roomId]";
import { OptionsContextType, OptionsType } from "../../../types/game/type";
import OptionsUserChips from "../../modules/forms/game/OptionsUserChips";
import BackWaitRoom from "../../atoms/transition/game/BackWaitRoom";
import OptionsBBSB from "../../modules/forms/game/OptionsBBSB";
import { UserContext } from "../../../../pages/_app";
import axios from "axios";
import GeneralButton from "../../atoms/form/start/GeneralButton";

const initOptions: OptionsType = {
  stacks: {},
  bb: 100,
  sb: 50,
};
// useContextでoptionsデータを子コンポーネントに共有
export const OptionsContext = createContext<OptionsContextType>({
  options: initOptions,
  setOptions: (options: OptionsType) => {},
});

type SetOptionType = {
  setShowOption: (showOption: boolean) => void;
};

const SetOption = ({ setShowOption }: SetOptionType) => {
  const { userInfo } = useContext(UserContext);
  const { memberInfo } = useContext(MemberContext);
  const [options, setOptions] = useState(initOptions);

  useEffect(() => {
    // 初めに初期値として各ユーザーに1000を設定
    const optionsObj = options; // stateを代入しワンクッション踏ませることでoptionを追加している
    Object.keys(memberInfo).map((key) => {
      // userIDのkey名でまだoption設定されていない場合は1000を登録
      optionsObj.stacks[key] = optionsObj.stacks[key] ?? 1000;
    });
    // 下の方法でstateオブジェクトを更新しないとjsx内で即時反映されない
    setOptions({ ...options, stacks: optionsObj.stacks });
  }, [memberInfo]);

  const sendOptions = async () => {
    try {
      const apiSendOptionsUrl =
        process.env.NEXT_PUBLIC_API_URL +
        "/api/ingame/" +
        userInfo.roomID +
        "/options?userID=" +
        userInfo.userID;
      await axios.post(apiSendOptionsUrl, options);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen bg-poker-color z-20 absolute top-0 left-0">
      <BackWaitRoom {...{ setShowOption }} />
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full container mx-auto px-8 max-w-lg">
          <div className="relative">
            <h1 className="text-5xl pt-20 pb-10 w-full">Option</h1>
            <OptionsContext.Provider value={{ options, setOptions }}>
              <OptionsUserChips />

              <OptionsBBSB />

              <div className="pt-3 pb-20 z-10 absolute bottom-0 right-0 bg-poker-color lg:pb-10">
                <GeneralButton
                  handleSendButton={() => sendOptions()}
                  typeName="start"
                  css="bg-gold-button"
                />
              </div>
            </OptionsContext.Provider>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SetOption;
