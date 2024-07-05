export const findById = (res, id) => res.find((item) => item.id === id)

export const upsert = (res, data) => {
	const index = res.findIndex((item) => item.id === data.id)
	if (data.id && index !== -1) {
		res[index] = data
	} else {
		res.push(post)
	}
}