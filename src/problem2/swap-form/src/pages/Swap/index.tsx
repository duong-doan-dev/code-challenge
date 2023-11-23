import { useCallback, useEffect, useMemo, useState } from "react";
import { FaAngleDown, FaArrowsRotate } from "react-icons/fa6";

// Components
import { InputGroup } from "@/components/InputGroup";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { SearchInput } from "@/components/SearchInput";
import { ListItem } from "@/components/ListItem";
import { Heading } from "@/components/common/Heading";

// Types
import { TokenList, TokenType } from "@/types/token";

// Constants
import { currencyData } from "@/constants/currencyData";
import { numberRegex } from "@/constants/regex";

// Styles
import { Container, StyledListWrap } from "./styled";

// Services
import { exchangeCurrencyToDollar } from "@/services/currencyExchange";
import {
  convertPayToReceive,
  convertReceiveToPay,
} from "@/services/currencyConvert";

// Utils
import { formatNumber } from "@/utils/formatNumber";

const Swap = () => {
  const [modalVisible, setModalVisible] = useState<TokenType | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const [tokenList, setTokenList] = useState<TokenList[]>(currencyData);
  const [selectedToken, setSelectedToken] = useState({
    pay: currencyData[0].value,
    receive: "",
  });
  const [tokenValue, setTokenValue] = useState({ pay: "", receive: "" });

  const [exchangedAmount, setExchangedAmount] = useState<
    Record<TokenType, string>
  >({
    pay: "",
    receive: "",
  });

  const [loading, setLoading] = useState({ pay: false, receive: false });

  const exchangeCurrencyAmount = async (
    amount: number,
    currency: string,
    type: TokenType
  ) => {
    try {
      setLoading((prev) => ({ ...prev, [type]: true }));
      const data = await exchangeCurrencyToDollar(amount, currency);

      setExchangedAmount((prev) => ({
        ...prev,
        [type]: formatNumber(data),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  useEffect(() => {
    if (searchValue) {
      setTokenList(
        currencyData.filter((item) => item.value.includes(searchValue))
      );
    } else {
      setTokenList(currencyData);
    }
  }, [searchValue]);

  useEffect(() => {
    exchangeCurrencyAmount(+tokenValue.pay, selectedToken.pay, TokenType.PAY);
  }, [selectedToken.pay, tokenValue.pay]);

  useEffect(() => {
    exchangeCurrencyAmount(
      +tokenValue.receive,
      selectedToken.receive,
      TokenType.RECEIVE
    );
  }, [selectedToken.receive, tokenValue.receive]);

  const selectedPayTokenData = useMemo(
    () => currencyData.find((currency) => currency.value === selectedToken.pay),
    [selectedToken.pay]
  );

  const selectedReceiveTokenData = useMemo(
    () =>
      currencyData.find((currency) => currency.value === selectedToken.receive),
    [selectedToken.receive]
  );

  const openModal = (type: TokenType) => {
    setModalVisible(type);
    setSearchValue("");
  };

  const closeModal = useCallback(() => setModalVisible(null), []);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;

    setSearchValue(newSearchTerm);
  };

  const changeTokenItem = async (token: string, type: TokenType) => {
    if (!Object.values(selectedToken).includes(token)) {
      setSelectedToken((prev) => ({ ...prev, [type]: token }));

      if (type === TokenType.RECEIVE) {
        const receiveAmount = await convertPayToReceive(
          { currency: selectedToken.pay, amount: +tokenValue.pay },
          { currency: token, amount: +tokenValue.receive }
        );

        if (receiveAmount) {
          setTokenValue((prev) => ({
            ...prev,
            receive: receiveAmount.toString(),
          }));
        }
      } else {
        const payAmount = await convertReceiveToPay(
          { currency: token, amount: +tokenValue.pay },
          { currency: selectedToken.receive, amount: +tokenValue.receive }
        );

        if (payAmount) {
          setTokenValue((prev) => ({ ...prev, pay: payAmount.toString() }));
        }
      }
    } else {
      swapToken();
    }
  };

  const swapToken = async () => {
    setSelectedToken(({ pay, receive }) => ({ pay: receive, receive: pay }));

    const receiveAmount = await convertPayToReceive(
      { currency: selectedToken.receive, amount: 1 },
      { currency: selectedToken.pay, amount: +tokenValue.receive }
    );

    if (receiveAmount != undefined) {
      setTokenValue({ pay: "1", receive: receiveAmount.toString() });
    }
  };

  const selectTokenItem = (value: string) => {
    changeTokenItem(value, modalVisible!);

    closeModal();
  };

  const handleChangeTokenValue = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    const inputName = e.target.name as TokenType;

    if (!inputValue || inputValue.match(numberRegex)) {
      setTokenValue((prev) => ({ ...prev, [inputName]: inputValue }));
    }

    if (inputName === TokenType.PAY) {
      const receiveAmount = await convertPayToReceive(
        { currency: selectedToken.pay, amount: +inputValue },
        { currency: selectedToken.receive, amount: +tokenValue.receive }
      );

      if (receiveAmount != undefined) {
        setTokenValue((prev) => ({
          ...prev,
          receive: receiveAmount.toString(),
        }));
      }
    } else {
      const payAmount = await convertReceiveToPay(
        { currency: selectedToken.pay, amount: +tokenValue.pay },
        { currency: selectedToken.receive, amount: +inputValue }
      );

      if (payAmount != undefined) {
        setTokenValue((prev) => ({ ...prev, pay: payAmount.toString() }));
      }
    }
  };

  return (
    <>
      <Container>
        <Heading>Currency converter</Heading>

        <InputGroup
          name="pay"
          value={tokenValue.pay}
          loading={loading.pay}
          onChange={handleChangeTokenValue}
          disabled={!selectedPayTokenData?.label}
          label="You pay"
          subLabel={`Equivalent to ${exchangedAmount.pay.toString()}`}
          placeholder="0"
          icon={
            <Button
              label={selectedPayTokenData?.label ?? "Select token"}
              endIcon={<FaAngleDown />}
              {...(selectedPayTokenData?.iconUrl && {
                startIcon: (
                  <img
                    src={selectedPayTokenData.iconUrl}
                    width={25}
                    height={25}
                  />
                ),
              })}
              {...(!selectedPayTokenData?.iconUrl && {
                variant: "default",
              })}
              onClick={() => openModal(TokenType.PAY)}
            />
          }
        />

        <Button
          icon={<FaArrowsRotate />}
          onClick={swapToken}
          variant="secondary"
        />

        <InputGroup
          name="receive"
          value={tokenValue.receive}
          loading={loading.receive}
          disabled={!selectedReceiveTokenData?.label}
          onChange={handleChangeTokenValue}
          label="You receive"
          subLabel={`Equivalent to ${exchangedAmount.receive.toString()}`}
          placeholder="0"
          icon={
            <Button
              label={selectedReceiveTokenData?.label ?? "Select token"}
              endIcon={<FaAngleDown />}
              {...(selectedReceiveTokenData?.iconUrl && {
                startIcon: (
                  <img
                    src={selectedReceiveTokenData.iconUrl}
                    width={25}
                    height={25}
                  />
                ),
              })}
              {...(!selectedReceiveTokenData?.iconUrl && {
                variant: "default",
              })}
              onClick={() => openModal(TokenType.RECEIVE)}
            />
          }
        />
      </Container>

      <Modal
        isOpen={Boolean(modalVisible)}
        title="Select a token"
        closeModal={closeModal}
      >
        <SearchInput
          name="searchToken"
          placeholder="Search token by name"
          value={searchValue}
          onChange={handleChangeSearchValue}
        />

        <StyledListWrap>
          {tokenList.map(({ iconUrl, label, value }) => (
            <ListItem
              key={value}
              selected={Object.values(selectedToken).includes(value)}
              disabled={selectedToken[modalVisible!] === value}
              label={label}
              value={value}
              icon={<img src={iconUrl} width={25} height={25} />}
              onClick={() => selectTokenItem(value)}
            />
          ))}
        </StyledListWrap>
      </Modal>
    </>
  );
};

export default Swap;
