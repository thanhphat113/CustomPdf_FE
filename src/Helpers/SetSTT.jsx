export function SetSTT(list) {
    const listHaveStt = Array.from(list).filter(item => item.stt && item.trangThai);

	const sorted = listHaveStt.sort((a,b) => {
		if (b.y !== a.y) return a.y - b.y
		return a.x - b.x
	})

	const withSTT = sorted.map((item) => ({
		id: item.id,
	  }));

    return withSTT;
}
