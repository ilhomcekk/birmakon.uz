import React from "react";
import MessageTab1 from "./MessageTab1";
import MessageTab2 from "./MessageTab2";
import MessageTab3 from "./MessageTab3";
import MessageDetail from "./MessageDetail";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MContainer } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import "../../assets/scss/_message.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useSelector } from "react-redux";

export default function Message() {
  const { reduxToken } = useSelector((state) => state.user);
  return (
    <>
      {reduxToken ? (
        <>
          <SecondNavbar />
          <MContainer style={{ minHeight: '70vh' }}>
            <Title name="Мои сообщение" />
            <div className="my__message">
              <Tabs>
                <TabList>
                  {/* <Tab>По пользователям</Tab> */}
                  <Tab>По магазинам</Tab>
                  <Tab>По администраторам</Tab>
                </TabList>
                {/* <TabPanel>
            <MessageTab1 />
          </TabPanel> */}
                <TabPanel>
                  <MessageTab2 />
                </TabPanel>
                <TabPanel>
                  <MessageTab3 />
                </TabPanel>
                {/* <TabPanel>
					<MessageTab4 />
				</TabPanel> */}
              </Tabs>
            </div>
          </MContainer>
        </>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ height: "500px" }}
        >
          Зарегистрируйте
        </div>
      )}
    </>
  );
}
