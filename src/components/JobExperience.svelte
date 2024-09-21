<script lang="ts">
	interface JobExperience {
		title: string;
		company: string;
		period: string;
		description: string;
	}

	const jobExperiences: JobExperience[] = [
		{
			title: 'Backend Developer',
			company: 'Optiminastic Media',
			period: 'Aug 2022 - Aug 2023',
			description:
				'Developing server side applications and helping in frontend using Express, Typescript and Next.js'
		},
		{
			title: 'Software Developer',
			company: 'R.D. National College',
			period: 'May 2022 - Jun 2022',
			description: 'Created both Website and App that is used by all students and college staff'
		},
		{
			title: 'Web Developer',
			company: 'ShellCode Solutions',
			period: 'Apr 2021 - Jul 2021',
			description: 'Creating and maintaing admin dashboards'
		}
	];
</script>

<section class="py-16 px-4 sm:px-6 lg:px-8">
	<h2 class="text-4xl sm:text-5xl font-black text-center my-5 mb-10">Experience</h2>
	<div class="space-y-8">
		{#each jobExperiences as job, i}
			<div
				class="bg-gray-800 border border-secondary max-w-[100%] sm:max-w-3xl"
				style={`${i & 1 ? 'margin-left' : 'margin-right'}: auto`}
			>
				<div class="p-6">
					<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
						<div>
							<h3 class="text-2xl font-semibold text-secondary">{job.title}</h3>
							<p>{job.company}</p>
						</div>
						<span class="text-sm text-slate-400 mt-2 sm:mt-0">{job.period}</span>
					</div>
					<p>{job.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
