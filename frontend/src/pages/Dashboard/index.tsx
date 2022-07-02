import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

export const Dashboard: FC = () => {

    return (
        <>
            <Container fluid className="vh-100 d-flex flex-column justify-content-center p-3 bg-dark">
                <Row className="h-100">
                    <Col xs={12} lg={10} id="table" className="order-1 order-lg-0">
                        <div className="d-flex h-100 flex-column flex-wrap align-items-stretch">
                            <div id="playedCards" className="flex-grow-1 d-flex justify-content-center align-items-center">
                                <div className="card bg-dark bg-gradient game-card m-3">
                                    <div className="card-body p-0 d-flex align-items-center justify-content-center">
                                        <h5 className="card-title card-number"></h5>
                                    </div>
                                </div>
                            </div>
                            <div id="myCards" className="d-flex justify-content-center align-items-center">
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={2} id="status" className="order-0 order-lg-1">
                        <div className="card w-100 mb-3 p-0 text-bg-dark bg-opacity-50">
                            <div className="card-body">
                                <p className="card-text">
                                    Current level:&nbsp;
                                    <span id="level"></span>
                                </p>
                                <p className="card-text">
                                    Health:&nbsp;
                                    <span id="health"></span>
                                </p>
                                <p className="card-text">
                                    Shuriken:&nbsp;
                                    <span id="shuriken"></span>
                                </p>
                            </div>
                        </div>
                        <div id="players">
                            <div className="card mt-2 player-container bg-opacity-50">
                                <div className="card-body">
                                    <h6 className="card-title player-name">
                                    </h6>
                                    <p className="card-text">
                                        Cards remaining:&nbsp;
                                        <span className="player-cards"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}