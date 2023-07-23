import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';
import { fetchCars } from '@/utils';

const LIMIT_DEFAULT = 10;
const LIMIT_MAX = 50;

export default async function Home({ searchParams }: HomeProps) {
	const allCars = await fetchCars({
		manufacturer: searchParams.manufacturer || '',
		model: searchParams.model || '',
		year: searchParams.year || new Date().getFullYear(),
		fuel: searchParams.fuel || '',
		limit: searchParams.limit || LIMIT_DEFAULT,
	});
	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

	return (
		<main className="overflow-hidden">
			<Hero />

			<div className="mt-12 padding-x padding-y max-width" id="discover">
				<div className="home__text-container">
					<h1 className="text-4xl font-extrabold">Car Catalogue</h1>
					<p>Explore out cars you might like</p>
				</div>

				<div className="home__filters">
					<SearchBar />

					<div className="home__filter-container">
						<CustomFilter title="fuel" options={fuels} />
						<CustomFilter title="year" options={yearsOfProduction} />
					</div>
				</div>

				{!isDataEmpty ? (
					<section>
						<div className="home__cars-wrapper">
							{allCars?.map((car) => (
								<CarCard car={car} key={JSON.stringify(car)} />
							))}
						</div>
						{((searchParams.limit || LIMIT_DEFAULT) <= LIMIT_MAX - LIMIT_DEFAULT) && (
							<ShowMore
								pageNumber={(searchParams.limit || LIMIT_DEFAULT) / LIMIT_DEFAULT}
								isNext={(searchParams.limit || LIMIT_DEFAULT) > allCars.length}
							/>
						)}
					</section>
				) : (
					<div className="home__error-container">
						<h2 className="text-black text-xl font-bold">Oops, no result</h2>
						<p>{allCars?.message}</p>
					</div>
				)}
			</div>
		</main>
	);
}
