import { useCallback, useEffect, useState } from "react"
import GameItem from "../../mollecules/GameItem"
import { getFeaturedGame } from "../../../services/player"
import { IMG_URL } from "../../../utils/link"
import { GameItemTypes } from "../../../services/data-types"

export default function FeaturedGame() {
    const [gameList, setGameList] = useState([]);

    const getFeatureGameList = useCallback(async () => {
        const data: any = await getFeaturedGame();
        setGameList(data);
    }, [getFeaturedGame]);

    useEffect(() => {
        getFeatureGameList();
    }, []);
    
    return (
        <section className="featured-game pt-50 pb-50">
            <div className="container-fluid">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">Our Featured<br /> Games This Year
                </h2>
                <div className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
                    data-aos="fade-up">
                    {gameList ? gameList.map((data : GameItemTypes) => {
                        return (
                            <GameItem
                                id={data._id}
                                key={data._id} 
                                thumbnail={`${IMG_URL}/${data.thumbnail}`}
                                title={data.name} 
                                category={data.category.name}
                            />
                        )
                    }) :
                        <h2>Mengambil Data ...</h2>
                    }
                </div>
            </div>
        </section>
    )
}
