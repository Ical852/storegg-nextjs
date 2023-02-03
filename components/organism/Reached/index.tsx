import ReachedDivider from "./ReachedDivider"
import ReachedItem from "./ReachedItem"

export default function Reached() {
    return (
        <section className="reached pt-50 pb-50">
            <div className="container-fluid">
                <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
                    <ReachedItem total="290M+" title="Players Top Up" first/>
                    <ReachedDivider/>
                    <ReachedItem total="12.500" title="Games Available" />
                    <ReachedDivider />
                    <ReachedItem total="99,9%" title="Happy Players" />
                    <ReachedDivider />
                    <ReachedItem total="4.7" title="Rating Worldwide" />
                </div>
            </div>
        </section>
    )
}
