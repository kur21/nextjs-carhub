'use client';

import { ShowMoreProps } from '@/types';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';
import { updateSearchParams } from '@/utils';

const LIMIT_DEFAULT = 10

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
	const router = useRouter();

	const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * LIMIT_DEFAULT
    const newPathname = updateSearchParams('limit', newLimit.toString())
    router.push(newPathname, {scroll: false})
  };

	return (
		<div className="w-full flex-center gap-5 mt-10">
			{!isNext && (
				<CustomButton
					title="Show More"
					btnType="button"
					containerStyles="bg-primary-blue text-white rounded-full"
					handleClick={handleNavigation}
				/>
			)}
		</div>
	);
};
export default ShowMore;
