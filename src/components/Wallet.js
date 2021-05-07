import React, { useState, useEffect } from 'react'
import WalletDataService from "../services/WalletDataService"
import { v4 as uuidv4 } from 'uuid'

import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'

import { formatCurrency } from "../utils/utils"
import { Wallet2, X } from 'react-bootstrap-icons';

const Wallet = (props) => {
  const _token = props.user.token;
  const initialWalletState = {
    "balance": 0,
    "isLoading": true,
    "page": 0
  };
  const [wallet, setWallet] = useState(initialWalletState)
  const [depositValue, setDepositValue] = useState("")
  const [withdrawValue, setWithdrawValue] = useState("")
  const [modal, setModal] = useState("");
  const [show, setShow] = useState(false);

  const handleError = (msg) => {
    props.history.push({
      pathname: '/error',
      state: {
        error: "ERROR: " + msg,
      },
    })
  }
  const handleClose = () => setShow(false);
  const handleShow = (change) => {
    if ((change === "deposit" && depositValue && !Number.isNaN(parseFloat(depositValue))) ||
      (change === "withdraw" && withdrawValue && !Number.isNaN(parseFloat(withdrawValue)))) {
      setModal(change);
      setShow(true)
    }
    else {
      handleError("Error when trying to deposit/withdraw. Please check the deposit/withdraw value")
    }
  };
  const handleSave = () => {
    if (modal === "deposit") {
      deposit(parseFloat(depositValue))
      setDepositValue("")
    }
    if (modal === "withdraw") {
      withdraw(parseFloat(withdrawValue))
      setWithdrawValue("")
    }
    setModal("");
    setShow(false);
  }

  //getBalance
  const getBalance = () => {
    setWallet({ ...wallet, "isLoading": true, "page": 0 })
    WalletDataService.getBalance(_token)
      .then(response => {
        if (response.data.status === "fail") {
          return handleError(response.data.data.error)
        }
        setWallet({ ...wallet, "balance": response.data.data.wallet.balance, "isLoading": false, "page": 0 })
      })
      .catch(e => {
        handleError(e)
      });
  }

  //addMoney
  const deposit = () => {
    const _data = { amount: depositValue, reference_id: uuidv4() };
    WalletDataService.deposit(_data, _token)
      .then(response => {
        getBalance()
      })
      .catch(e => {
        handleError(e)
      });
  }

  //useMoney
  const withdraw = () => {
    const _data = { amount: withdrawValue, reference_id: uuidv4() };
    WalletDataService.withdraw(_data, _token)
      .then(response => {
        getBalance()
      })
      .catch(e => {
        handleError(e)
      });
  }

  //disable
  const disable = () => {
    const _data = { is_disabled: true };
    WalletDataService.disable(_data, _token)
      .then(response => {
        props.history.push('/');
      })
      .catch(e => {
        handleError(e)
      });
  }

  useEffect(() => {
    getBalance() //eslint-disable-next-line
  }, []);

  const balanceWallet = wallet.isLoading ? (
    <Row className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Row>

  ) : (
    <Row>
      <Col className="d-flex align-items-center justify-content-center"><h3>Balance:</h3></Col>
      <Col className="text-center"><h1><Badge variant={wallet.balance >= 0 ? "primary" : "danger"}>{wallet.balance < 10 ** 9 ? formatCurrency(wallet.balance) : formatCurrency(wallet.balance, { len: 1 })}</Badge></h1></Col>
    </Row>
  )

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to {modal} {modal === "deposit" ? formatCurrency(parseFloat(depositValue)) : formatCurrency(parseFloat(withdrawValue))}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <Card className="p-4">
          <h3 className="text-right"><Button variant="link" onClick={() => disable()}><X size={40} /></Button></h3>
          <h5><Wallet2 />{` ${props.user.name.toUpperCase()}'s`} Wallet</h5>
          <span className="m-1" />
          {balanceWallet}
          {/** balance */}
          {wallet.page === 0 && (
            <>
              <span className="m-3" />
              <div className="w-100 d-flex justify-content-around">
                <Button variant="outline-primary" disabled={wallet.isLoading} onClick={() => setWallet({ ...wallet, "page": 1 })}>Deposit</Button>{' '}
                <Button variant="outline-primary" disabled={wallet.isLoading} onClick={() => setWallet({ ...wallet, "page": 2 })}>Withdraw</Button>
              </div>
            </>
          )}
          {/** deposit */}
          {wallet.page === 1 && (
            <>
              <Form className="p-2" >
                <FormControl type="text" placeholder="Deposit Amount" value={depositValue} onChange={(e) => setDepositValue(e.target.value ? e.target.value : null)} />
                <span className="m-3" />
                <Row className="d-flex justify-content-around">
                  <Button variant="outline-primary" onClick={() => handleShow("deposit")}>Deposit</Button>
                  <Button variant="outline-secondary" onClick={() => setWallet({ ...wallet, "page": 0 })}>Cancel</Button>
                </Row>
              </Form>
            </>
          )}
          {/** withdraw */}
          {wallet.page === 2 && (
            <>
              <Form className="p-2" >
                <FormControl type="text" placeholder="Withdraw Amount" value={withdrawValue} onChange={(e) => setWithdrawValue(e.target.value ? e.target.value : null)} />
                <span className="m-3" />
                <Row className="d-flex justify-content-around">
                  <Button variant="outline-primary" onClick={() => handleShow("withdraw")}>Withdraw</Button>
                  <Button variant="outline-secondary" onClick={() => setWallet({ ...wallet, "page": 0 })}>Cancel</Button>
                </Row>
              </Form>
            </>
          )}
        </Card>
      </div >
    </>
  )
}

export default Wallet
