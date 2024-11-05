<template>
	<div class="flex flex-col md:flex-row">
		<div class="flex flex-col items-stretch md:m-12 place-content-center">
			<p class="text-lg">Вітаємо!</p>
			<p>
				Кни́га — неперіодичне видання у вигляді зброшурованих аркушів друкованого матеріалу, набір письмових,друкованих,
				ілюстрованих або порожніх аркушів, виготовлених з паперу, пергаменту або іншого матеріалу, як правило,
				скріплених з одного боку. Сторони аркуша називаються сторінками. Книга виготовлена в цифровому вигляді
				називається електронною книгою.
			</p>
			<router-link
				class="flex flex-row"
				to="#">
				Авторизація
				<svg
					class="w-6 h-6 text-sky-600 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m9 5 7 7-7 7" />
				</svg>
			</router-link>
		</div>
		<img
			src="/library.jpg"
			class="rounded md:w-1/2"
			alt="library" />
	</div>
	<div
		class="flex flex-col md:flex-row"
		v-for="book in books">
		<img
			v-for="image in book.images"
			v-if="book._id === '672a109de6b9aaa5707205d3'"
			class="flex flex-col md:w-1/6"
			:src="image"
			alt="" />
		<div>
			<div class="flex flex-col items-stretch md:m-12 place-content-center">
				<p class="text-lg">{{ book.title }}</p>
				<p class="text-lg">{{ book.author }}</p>
				<p>{{ book.description }}</p>
				<router-link
					class="flex flex-row"
					to="#">
					Детальніше
					<svg
						class="w-6 h-6 text-sky-600 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m9 5 7 7-7 7" />
					</svg>
				</router-link>
			</div>
		</div>
		<img
			v-if="book._id === '672a109de6b9aaa5707205d4'"
			v-for="image in book.images"
			class="flex flex-col md:w-1/6"
			:src="image"
			alt="" />
	</div>
</template>

<script setup>
	const books = [
		{
			_id: '672a109de6b9aaa5707205d3',
			title: 'Всі системи: небезпека',
			author: 'Марта Веллс',
			year: 2023,
			genre: 'Наукова фантастика',
			description:
				'Перед нами - захоплива подорож у майбутнє, яка зачаровує своєю оригінальністю та неймовірним сюжетом. Перша книга фантастичного циклу беззаперечно відзначилася серією найпрестижніших літературних нагород, у тому числі Hugo, Nebula, Alex та Locus, і нещодавно вона неодноразово підтвердила свою заслужену репутацію. Автор майстерно переносить нас у захоплюючий світ майбутнього, де космічні подорожі та планетарні місії контролюються бізнес-компаніями.',
			__v: 0,
			createdAt: '2024-11-05T12:33:33.927Z',
			updatedAt: '2024-11-05T12:33:33.927Z',
			images: [
				'https://static.yakaboo.ua/media/catalog/product/_/1/_1._.jpg',
				'https://static.yakaboo.ua/media/catalog/product/i/m/img952_85.jpg',
				'https://static.yakaboo.ua/media/mediagallery/image/0/1/01_1125_7.jpg',
			],
		},
		{
			_id: '672a109de6b9aaa5707205d4',
			title: 'Довга Хода',
			author: 'Стівен Кінг',
			year: 2022,
			genre: 'Наукова фантастика',
			description:
				'Тоталітарне майбутнє. У щорічному змаганні для хлопців під назвою «Довга Хода» переможець лише один і він отримає все. На решту учасників чекає смерть. Шістнадцятирічний Рей наважується взяти участь у «Довгій Ході». Його суперники — 99 підлітків. Кожен з них прагне перемогти і вижити. Для цього потрібно весь час іти заздалегідь визначеним маршрутом зі швидкістю не менше ніж чотири милі на годину. Кожен непослух карається попередженням.За годину їх можна отримати не більше трьох. Замість четвертого — розстріл. Рей і 99 хлопців починають змагатися зі смертю. Але до кінця дійде лише один.',
			__v: 0,
			createdAt: '2024-11-05T12:33:33.927Z',
			updatedAt: '2024-11-05T12:33:33.927Z',
			images: [
				'https://static.yakaboo.ua/media/catalog/product/i/m/img829_138.jpg',
				'https://static.yakaboo.ua/media/catalog/product/i/m/img830_14.jpg',
				'https://static.yakaboo.ua/media/mediagallery/image/0/2/02_640_38.jpg',
			],
		},
	]
</script>

<style lang="scss" scoped></style>
