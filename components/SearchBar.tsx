'use client';

import { FormEvent, useEffect, useState } from 'react';
import SearchManufacturer from './SearchManufacturer';
import Image from 'next/image';
import SearchModel from './SearchModel';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
	<button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
		<Image src="/magnifying-glass.svg" alt="magnifying glass" width={40} height={40} className="object-contain" />
	</button>
);

const SearchBar = () => {
  const router = useRouter()
	const [manufacturer, setManufacturer] = useState('');
	const [model, setModel] = useState('');

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
    
		if(manufacturer === '' && model === '' ) {
      return alert('Please fill in the search bar')
    }

    updateSearchParams(manufacturer, model)
	};

  const updateSearchParams = (manufacturer: string, model: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if(searchParams.get('limit')) {
      searchParams.delete('limit')
    }

    if(manufacturer) {
      searchParams.set('manufacturer', manufacturer.toLowerCase())
    } else {
      searchParams.delete('manufacturer')
    }

    if(model) {
      searchParams.set('model', model.toLowerCase())
    } else {
      searchParams.delete('model')
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathname, { scroll: false })
  }

	return (
		<form className="searchbar" onSubmit={handleSearch}>
			<div className="searchbar__item">
				<SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
				<SearchButton otherClasses="sm:hidden" />
			</div>

			<div className="searchbar__item">
        <SearchModel model={model} setModel={setModel}/>
        <SearchButton otherClasses="sm:hidden" />
			</div>
      <SearchButton otherClasses="max-sm:hidden" />
		</form>
	);
};
export default SearchBar;
