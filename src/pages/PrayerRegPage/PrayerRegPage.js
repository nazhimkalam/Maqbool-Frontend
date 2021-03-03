import React, { useState } from 'react';
import styled from 'styled-components';
import prayerCoverImage from './image.jpg';
import { Button, Form, Input, message } from 'antd';

function PrayerRegPage() {
	const [nicPassport, setNicPassport] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [fullName, setFullName] = useState('');
	const [selectJamaathOption, setSelectJamaathOption] = useState('');

	const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const PHONE_NUMBER_REGEX = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
	const NAMES_REGEX = /^[a-z ,.'-]+$/i;

	const onHandleRegister = () => {
		alert('Registering...');
	};

	return (
		<PrayerRegPageMain>
			{/* bg image */}
			<div className="prayerReg__title">
				<p>Prayers</p> <p>Registration</p>
			</div>

			<div className="prayerReg__body">
				<div className="prayerReg__bodyDescription">
					<h2>Maqbool Jumuah Registration</h2>
					<p>Terms and Conditions</p>
					<p>
						Please note that registration is compulsory to enter the Masjid Children below the age of 15 will not be
						allowed to enter. Your own prayer mat and mask is compulsory. If you registered and didn't receive a token
						number via SMS means you have not been selected due to the slots being full. A valid ID Number is required
						(If invalid, your registration will be revoked) You will have to show the SMS with the confirmed details you
						receive at the entry checkpoint. Double entries will be cancelled as its only 1 token per person. Please
						double check the details you submit as if it is invalid then you will not receive the token even though you
						have been selected. Please do not submit your application twice; if you did, your entire registration would
						be revoked.
					</p>
				</div>
				<div className="prayerReg__bodyForm">
					<Form
						className="register__formSection"
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onHandleRegister}
					>
						<div>
							<p>NIC/Passport Number</p>
							<Form.Item
								className="prayerReg__bodyFormNIC"
								name="nic-passport"
								rules={[{ required: true, message: 'Please fill in your NIC/Passport Number!' }]}
							>
								<Input id="nic-passport" onChange={(e) => setNicPassport(e.target.value)} />
							</Form.Item>
						</div>
						<div>
							<p>Email</p>
							<Form.Item
								className="prayerReg__bodyFormEmail"
								name="email"
								rules={[
									{ required: true, message: 'Please enter your Email' },
									{ pattern: EMAIL_REGEX, message: 'Please enter a valid E-mail!' },
								]}
							>
								<Input id="email" onChange={(e) => setEmail(e.target.value)} />
							</Form.Item>
						</div>
						<div>
							<p>Mobile Number</p>
							<Form.Item
								className="prayerReg__bodyFormMobile"
								name="mobile"
								rules={[
									{ required: true, message: 'Please enter your Mobile Number' },
									{ pattern: PHONE_NUMBER_REGEX, message: 'Please enter a valid Mobile Number!' },
								]}
							>
								<Input id="mobile" onChange={(e) => setMobileNumber(e.target.value)} />
							</Form.Item>
						</div>
						<div>
							<p>Full Name</p>
							<Form.Item
								className="prayerReg__bodyFormFullName"
								name="fullName"
								rules={[
									{ required: true, message: 'Please enter your Full Name' },
									{ pattern: PHONE_NUMBER_REGEX, message: 'Please enter a valid name!' },
								]}
							>
								<Input id="fullName" onChange={(e) => setFullName(e.target.value)} />
							</Form.Item>
						</div>

                        <div>
							<p>Jamaath Timings</p>
							<section>
                                <div>
                                    <p>Jamaath 1</p>
                                    <p>Gates Open at - 12:10</p>
                                    <p>Kuthuba - 12:30</p>
                                    <p>Namaaz - 12:45</p>
                                </div>
                                <div>
                                    <p>Jamaath 2</p>
                                    <p>Gates Open at - 12:50</p>
                                    <p>Kuthuba - 13:00</p>
                                    <p>Namaaz - 13:15</p>
                                </div>
                                <div>
                                    <p>Jamaath 3</p>
                                    <p>Gates Open at - 13:20</p>
                                    <p>Kuthuba - 13:30</p>
                                    <p>Namaaz - 13:45</p>
                                </div>
							</section>
						</div>

						<div>
							<p>Jamaath Options</p>
							<div>
								<select onChange={(e) => setSelectJamaathOption(e.target.value)}>
									<option>Select an Option</option>
									<option value="Option 1">Option 1</option>
									<option value="Option 2">Option 2</option>
									<option value="Option 3">Option 3</option>
								</select>
							</div>
						</div>

						<button htmlType="submit" className="prayerReg__bodyFormRegister">
							Confirm Jamaath
						</button>
					</Form>
				</div>
			</div>
		</PrayerRegPageMain>
	);
}

const PrayerRegPageMain = styled.div`
	.prayerReg__title {
		background-image: url(${prayerCoverImage});
		background-repeat: no-repeat;
		background-size: cover;
		padding: 100px 150px;
		background-position: center;
		width: 100%;
	}
	.prayerReg__title > p {
		font-size: 80px;
		font-weight: lighter;
		margin: 0 !important;
		line-height: 80px;
		/* border: 1px red solid; */
		color: white;
	}
	.prayerReg__title > p:first-child {
		font-weight: 700;
	}
`;
export default PrayerRegPage;
