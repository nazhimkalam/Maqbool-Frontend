import { DownOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TimePray from './TimePray';

function PrayerTimer() {
	const [displayFajr, setDisplayFajr] = useState(false);
	const [displaySunrise, setDisplaySunrise] = useState(false);
	const [displayDhuhr, setDisplayDhuhr] = useState(false);
	const [displayAsr, setdisplayAsr] = useState(false);
	const [displayMaghrib, setDisplayMaghrib] = useState(false);
	const [displayIsha, setDisplayIsha] = useState(false);
	const [countDownValue, setCountDownValue] = useState();
	const [juristicValue, setJuristicValue] = useState(1);
	const [city, setCity] = useState('Colombo');

	const [prayerDetails, setPrayerDetails] = useState();
	const PRAYER_TIME_API =
		'https://api.aladhan.com/v1/timingsByCity?city=' + city + '&country=SriLanka&method=3&school=' + juristicValue;

	const LOADING_GIF_URL = 'https://i.stack.imgur.com/UUjhE.gif';
	const MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	// const handleUpdatePrayerDetais = () => {
	// 	// This is fetching the exchange rate API details
	// 	fetch(PRAYER_TIME_API)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			// we have fetched all the prayers from the api
	// 			setPrayerDetails(data.results.datetime[1].times);
	// 		});
	// };
	// fetching all the prayer details from a REST API
	useEffect(() => {
		// This is fetching the exchange rate API details
		fetch(PRAYER_TIME_API)
			.then((res) => res.json())
			.then((data) => {
				// we have fetched all the prayers from the api
				console.log(data.data.timings);
				console.log(PRAYER_TIME_API);
				setPrayerDetails(data.data.timings);
			});
	}, [juristicValue]);

	// Juristic Menu
	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="Hanafi" icon={<FieldTimeOutlined />}>
				Hanafi
			</Menu.Item>
			<Menu.Item key="Maliki" icon={<FieldTimeOutlined />}>
				Maliki
			</Menu.Item>
			<Menu.Item key="Shafi" icon={<FieldTimeOutlined />}>
				Shafi
			</Menu.Item>
			<Menu.Item key="Hanbali" icon={<FieldTimeOutlined />}>
				Hanbali
			</Menu.Item>
		</Menu>
	);

	// filtering the data related to the juristic menu
	function handleMenuClick({ key }) {
		// 1 = Hanafi
		// 0 = Hanbali, Maliki and Shafi
		if (key === 'Hanafi') {
			setJuristicValue(1);
		} else {
			setJuristicValue(0);
		}
	}

	useEffect(() => {
		let FajrTimeInMins = parseInt(prayerDetails?.Fajr.split(':')[0]) * 60 + parseInt(prayerDetails?.Fajr.split(':')[1]);

		let SunriseTimeInMins =
			parseInt(prayerDetails?.Sunrise.split(':')[0]) * 60 + parseInt(prayerDetails?.Sunrise.split(':')[1]);

		let DhuhrTimeInMins =
			parseInt(prayerDetails?.Dhuhr.split(':')[0]) * 60 + parseInt(prayerDetails?.Dhuhr.split(':')[1]);

		let AsrTimeInMins = parseInt(prayerDetails?.Asr.split(':')[0]) * 60 + parseInt(prayerDetails?.Asr.split(':')[1]);

		let MaghribTimeInMins =
			parseInt(prayerDetails?.Maghrib.split(':')[0]) * 60 + parseInt(prayerDetails?.Maghrib.split(':')[1]);

		let IshaTimeInMins = parseInt(prayerDetails?.Isha.split(':')[0]) * 60 + parseInt(prayerDetails?.Isha.split(':')[1]);

		let currentTime = parseInt(new Date().getHours()) * 60 + parseInt(new Date().getMinutes());

		if (currentTime * 60000 >= FajrTimeInMins * 60000 && currentTime * 60000 <= SunriseTimeInMins * 60000) {
			setDisplaySunrise(true);
			setDisplayFajr(false);
			setdisplayAsr(false);
			setDisplayDhuhr(false);
			setDisplayMaghrib(false);
			setDisplayIsha(false);
			setCountDownValue(SunriseTimeInMins * 60000 - currentTime * 60000);
		} else if (currentTime * 60000 >= SunriseTimeInMins * 60000 && currentTime * 60000 <= DhuhrTimeInMins * 60000) {
			setDisplaySunrise(false);
			setDisplayFajr(false);
			setdisplayAsr(false);
			setDisplayDhuhr(true);
			setDisplayMaghrib(false);
			setDisplayIsha(false);
			setCountDownValue(DhuhrTimeInMins * 60000 - currentTime * 60000);
		} else if (currentTime * 60000 >= DhuhrTimeInMins * 60000 && currentTime * 60000 <= AsrTimeInMins * 60000) {
			setDisplaySunrise(false);
			setDisplayFajr(false);
			setdisplayAsr(true);
			setDisplayDhuhr(false);
			setDisplayMaghrib(false);
			setDisplayIsha(false);
			setCountDownValue(AsrTimeInMins * 60000 - currentTime * 60000);
		} else if (currentTime * 60000 >= AsrTimeInMins * 60000 && currentTime * 60000 <= MaghribTimeInMins * 60000) {
			setDisplaySunrise(false);
			setDisplayFajr(false);
			setdisplayAsr(false);
			setDisplayDhuhr(false);
			setDisplayMaghrib(true);
			setDisplayIsha(false);
			setCountDownValue(MaghribTimeInMins * 60000 - currentTime * 60000);
		} else if (currentTime * 60000 >= MaghribTimeInMins * 60000 && currentTime * 60000 <= IshaTimeInMins * 60000) {
			setDisplaySunrise(false);
			setDisplayFajr(false);
			setdisplayAsr(false);
			setDisplayDhuhr(false);
			setDisplayMaghrib(false);
			setDisplayIsha(true);
			setCountDownValue(IshaTimeInMins * 60000 - currentTime * 60000);
		} else if (currentTime * 60000 >= IshaTimeInMins * 60000 && currentTime * 60000 <= 24 * 60 * 60000) {
			setDisplaySunrise(false);
			setDisplayFajr(true);
			setdisplayAsr(false);
			setDisplayDhuhr(false);
			setDisplayMaghrib(false);
			setDisplayIsha(false);
			setCountDownValue((24 * 60 * 60000 - currentTime * 60000 )+ FajrTimeInMins * 60000);
		} else if (currentTime * 60000 >= 0 * 60000 && currentTime * 60000 <= FajrTimeInMins * 60000){
			setDisplaySunrise(false);
			setDisplayFajr(true);
			setdisplayAsr(false);
			setDisplayDhuhr(false);
			setDisplayMaghrib(false);
			setDisplayIsha(false);
			setCountDownValue( FajrTimeInMins * 60000 - currentTime * 60000);
		}
	}, [prayerDetails]);
	return (
		<PrayerTimerContainer>
			{prayerDetails ? (
				<div>
					{/* Title */}
					<div className="topContainer">
						<div className="topContainerLeft">
							<h1>Prayer Times</h1>
							<div className="juristicContainer">
								<p>
									Juristic Settings <small>(Hanafi by default)</small>
								</p>
								<Dropdown overlay={menu}>
									<Button>
										Select <DownOutlined />
									</Button>
								</Dropdown>
								{/* <Input
									className="cityName"
									type="text"
									placeholder="City Name"
									onChange={(e) => setCity(e.target.value)}
									value={city}
								/>
								<Button onClick={handleUpdatePrayerDetais}>Search</Button> */}
							</div>
						</div>
						<h3>
							{new Date().getDate()} {MONTHS[new Date().getMonth()]} {new Date().getFullYear()}
						</h3>
					</div>

					{/* list of prayer */}
					<div className="prayerList">
						<TimePray
							name="Fajr"
							time={prayerDetails?.Fajr}
							displayCurrent={displayFajr}
							countDownTime={countDownValue}
						/>
						<TimePray
							name="Sunrise"
							time={prayerDetails?.Sunrise}
							displayCurrent={displaySunrise}
							countDownTime={countDownValue}
						/>
						<TimePray
							name="Dhuhr"
							time={prayerDetails?.Dhuhr}
							displayCurrent={displayDhuhr}
							countDownTime={countDownValue}
						/>
						<TimePray name="Asr" time={prayerDetails?.Asr} displayCurrent={displayAsr} countDownTime={countDownValue} />
						<TimePray
							name="Maghrib"
							time={prayerDetails?.Maghrib}
							displayCurrent={displayMaghrib}
							countDownTime={countDownValue}
						/>
						<TimePray
							name="Isha"
							time={prayerDetails?.Isha}
							displayCurrent={displayIsha}
							countDownTime={countDownValue}
						/>
					</div>
				</div>
			) : (
				<div className="loadingImage">
					<img src={LOADING_GIF_URL} alt="" />
				</div>
			)}
		</PrayerTimerContainer>
	);
}
const PrayerTimerContainer = styled.div`
	border: 1px whitesmoke solid;
	border-radius: 20px;
	background-color: whitesmoke;
	padding: 20px;
	width: 100%;

	.juristicContainer > p {
		font-size: 20px;
	}
	.loadingImage {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loadingImage > img {
		object-fit: contain;
		height: 100px;
	}
	.cityName {
		width: 250px;
	}
	.topContainer,
	.prayerList {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.prayerList {
		flex-wrap: wrap;
		justify-content: space-evenly !important;

		margin-top: 50px;
	}

	@media screen and (max-width: 500px) {
		.topContainerLeft > h1 {
			font-size: 1.3rem;
		}
		.juristicContainer > p {
			font-size: 1rem;
		}
		.topContainer > h3 {
			display: none;
		}
		.prayerList {
			margin-top: 30px;
		}
	}
	@media screen and (max-width: 300px) {
		.topContainerLeft > h1 {
			font-size: 1rem;
		}
		.juristicContainer > p {
			font-size: 0.8rem;
		}
	}
`;
export default PrayerTimer;
