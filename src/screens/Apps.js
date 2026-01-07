import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getApps } from "../api/api";
import CF7AppsSkeletonLoader from "../components/CF7AppsSkeletonLoader";
import CF7AppsApp from "../components/CF7AppsApp";
import { useParams } from "react-router";

const Apps = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [apps, setApps] = useState(false);
    const { parent } = useParams();

    useEffect( () => {
        async function fetchApps() {
            const apps = await getApps();
            setApps(apps);
            setIsLoading(false);
        }
        
        fetchApps();
    }, []);

    const normalizeParent = (parent) => String(parent || '').toLowerCase().replace( /\s+/g, '-' );

    const renderAppsFor = (key) => {
        if ( ! apps || ! Array.isArray( apps ) ) {
            return null;
        }

        return apps.map( ( app, idx ) => {
            if ( normalizeParent( app.parent_menu ) === key ) {
                return <CF7AppsApp key={ app.id || idx } settings={ app } />;
            }

            return null;
        } );
    };

    return (
        <div className="cf7apps-body">
            <div className="cf7apps-apps-header">
                <div className="cf7apps-container">
                    <div>
                        <h2>{ __( 'Unleash the full potential of Contact Form 7!', 'cf7apps' ) }</h2>
                        <p>
                            { __( 'Simplify, customize, and enhance your form building experience.', 'cf7apps' ) }
                        </p>
                    </div>
                </div>
            </div>
            <div className="cf7apps-apps-section">
                <div className="cf7apps-container">
                    <h2>{ __( 'General', 'cf7apps' ) }</h2>

                    <div className={ 'cf7apps-apps-container' }>
                        {
                            isLoading ?
                                <>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                </> :
                                renderAppsFor( 'general' )
                        }
                    </div>

                    <h2>{ __( 'Spam Protection Apps', 'cf7apps' ) }</h2>
                    <div className="cf7apps-apps-container">
                        {
                            isLoading ?
                                <>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                </> :
                                <>
                                    { renderAppsFor( 'spam-protection' ) }
                                </>
                        }
                    </div>
                    
                    <h2>{ __( 'Integration', 'cf7apps' ) }</h2>
                    <div className="cf7apps-apps-container">
                        {
                            isLoading ?
                                <>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                    <div className="cf7apps-app">
                                        <CF7AppsSkeletonLoader width="100%" height={250} />
                                    </div>
                                </> :
                                renderAppsFor( 'integration' )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Apps;