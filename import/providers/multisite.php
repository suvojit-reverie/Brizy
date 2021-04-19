<?php defined( 'ABSPATH' ) or die();

class Brizy_Import_Providers_Multisite {

	private $mainSite;

	public function __construct() {
		$this->mainSite = 'https://websitebuilder-demo.net/';
	}

	/**
	 * @throws Exception
	 * @return array
	 */
	public function getAllDemos() {
		$request = wp_remote_get( $this->mainSite . 'wp-json/demos/v1/demos', [
			'headers' => [
				'content-type' => 'application/json'
			],
		] );

		if ( is_wp_error( $request ) ) {
			throw new Exception( $request->get_error_message() );
		}

		if ( 200 !== wp_remote_retrieve_response_code( $request ) ) {
			throw new Exception( ( empty( $request['response']['message'] ) ? 'Invalid response code returned by server demo provider' : $request['response']['message'] ) );
		}

		$demos = json_decode( wp_remote_retrieve_body( $request ), true );

		if ( json_last_error() ) {
			throw new Exception( 'Json Decode Error: ' . json_last_error() );
		}

		if ( empty( $demos ) ) {
			throw new Exception( 'No templates found' );
		}

		return $demos;
	}

	public function getDemoUrl( $key, $demo ) {
		return add_query_arg( [ 'key' => $key ], $this->mainSite . $demo );
	}
}
