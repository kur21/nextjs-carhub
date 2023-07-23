import { SearchModelProps } from '@/types';
import Image from 'next/image';

const SearchModel = ({ model, setModel }: SearchModelProps) => {
	return (
		<>
			<Image
				src="/model-icon.png"
				width={25}
				height={25}
				className="absolute w-[20px] h-[20px] ml-4"
				alt="car model icon"
			/>
			<input
				type="text"
				name="model"
				value={model}
				onChange={(e) => setModel(e.target.value)}
				placeholder="Search Model"
				className="searchbar__input"
			/>
		</>
	);
};
export default SearchModel;
