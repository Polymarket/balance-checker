import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { getBalance } from "../utils";

type ModalProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    question: string;
    outcome: string;
    positionId: string;
    show: boolean;
};

const BalanceModal: React.FC<ModalProps> = ({
    setShow,
    question,
    outcome,
    positionId,
    show,
}): JSX.Element => {
    const [balance, setBalance] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [address, setAddress] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();
        try {
            const balance = await getBalance({ address, positionId });
            setBalance((+balance / 1000000).toFixed(6));
        } catch (error) {
            setErrorMessage((error as any).message);
        }
    }
    return (
        <Modal show={show} onHide={setShow}>
            <Modal.Header closeButton>
                <Modal.Title>Customer Balance</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <h6> {question} </h6>
                    <span>
                        Enter a customer's address to get their balance for
                        position: <h6>{outcome}</h6>
                    </span>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                        />
                    </Form.Group>
                    {balance && (
                        <p className="balance">Customer Balance: {balance}</p>
                    )}
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
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShow(false);
                            setBalance(undefined);
                            setErrorMessage("");
                        }}
                    >
                        Close
                    </Button>
                    <Button id="submit-button" variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
export default BalanceModal;
