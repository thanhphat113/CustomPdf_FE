export function SwapPositionById(list, id1, id2) {
    const copy = [...list]

	const index1 = copy.findIndex(el => el.id === id1)
	const index2 = copy.findIndex(el => el.id === id2)

	const tempX = copy[index1].x
	const tempY = copy[index1].y

	copy[index1].x = copy[index2].x
	copy[index1].y = copy[index2].y

	copy[index2].x = tempX
	copy[index2].y = tempY

	return copy
}
