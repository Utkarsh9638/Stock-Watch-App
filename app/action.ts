"use server"

export const fetchStocks = async () => {
    const res = await fetch('https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers?type=STOCKS&page=1', {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2efc701d9fmsh31ef9197e1d4916p1ce226jsnbff886af9941',
		'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
	}
});
    const data = await res.json();
    return data;
}