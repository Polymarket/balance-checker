import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { getBalance } from "../utils";

type PropsFunction = () => void;
type ModalProps = {
    handleClose: PropsFunction;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    question: string;
    outcomeText: string;
    errorMessage: string;
    address: string;
    positionId: string;
    show: boolean;
};

const BalanceModal: React.FC<ModalProps> = ({
    handleClose,
    setAddress,
    setErrorMessage,
    question,
    outcomeText,
    errorMessage,
    address,
    positionId,
    show,
}): JSX.Element => {
    const [balance, setBalance] = useState<string | undefined>(undefined);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<string> {
        e.preventDefault();
        return getBalance({ address, positionId, setBalance, setErrorMessage });
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Customer Balance</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <h6> {question} </h6>
                    <h6>
                        Enter a customer's address to get their balance for
                        position: {outcomeText}
                    </h6>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                        />
                    </Form.Group>
                    {balance && <p>Customer Balance: {balance}</p>}
                    {errorMessage && (
                        <Alert
                            variant="danger"
                            onClose={() => setErrorMessage("")}
                            dismissible
                        >
                            <Alert.Heading>
                                Oh snap! You got an error!
                            </Alert.Heading>
                            <p>{errorMessage}</p>
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
export default BalanceModal;
