<template>
	<footer class="m-4 bg-white rounded-lg shadow dark:bg-gray-800">
		<div class="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2024
				<router-link
					:to="{ name: 'home' }"
					class="hover:underline">
					Єbook™
				</router-link>
				. All Rights Reserved.
			</span>
			<ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
				<li>
					<router-link
						:to="{ name: 'about' }"
						class="hover:underline me-4 md:me-6">
						Про нас
					</router-link>
				</li>
				<li>
					<a
						href="#"
						class="hover:underline me-4 md:me-6">
						Privacy Policy
					</a>
				</li>
				<li>
					<a
						href="#"
						class="hover:underline me-4 md:me-6">
						Licensing
					</a>
				</li>
				<li>
					<a
						href="#"
						class="hover:underline">
						Contact
					</a>
				</li>
			</ul>
		</div>
	</footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
